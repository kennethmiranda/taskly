const request = require("supertest");
const app = require("../server");
const pool = require("../mysql");
const path = require("path");
const fs = require("fs");

let user;

describe("API Tests", () => {
  beforeAll(async () => {
    user = {
      email: "test@example.com",
      name: "Test User",
    };

    const [result] = await pool.query(
      "INSERT INTO users (email, name) VALUES (?, ?)",
      [user.email, user.name]
    );
    user.id = result.insertId;
  });

  afterAll(async () => {
    await pool.query("DELETE FROM tasks WHERE userId = ?", [user.id]);
    await pool.query("DELETE FROM users WHERE id = ?", [user.id]);
    await pool.end();
  });

  describe("Task Management API", () => {
    describe("GET /api/tasks", () => {
      test("returns tasks for authenticated user", async () => {
        const response = await request(app)
          .get("/api/tasks")
          .query({ userEmail: user.email })
          .expect(200);

        expect(Array.isArray(response.body)).toBeTruthy();
      });

      test("requires user email", async () => {
        await request(app).get("/api/tasks").expect(400);
      });
    });

    describe("POST /api/tasks", () => {
      test("creates new task", async () => {
        const newTask = {
          userEmail: user.email,
          title: "Test Task",
          description: "Test Description",
          status: "todo",
          priority: "high",
        };

        const response = await request(app)
          .post("/api/tasks")
          .send(newTask)
          .expect(201);

        expect(response.body.task).toMatchObject({
          title: newTask.title,
          status: newTask.status,
          priority: newTask.priority,
        });
      });

      test("validates required fields", async () => {
        await request(app).post("/api/tasks").send({}).expect(400);
      });
    });

    describe("PATCH /api/tasks/:id", () => {
      let taskId;

      beforeEach(async () => {
        const [result] = await pool.query(
          "INSERT INTO tasks (userId, title, status, priority) VALUES (?, ?, ?, ?)",
          [user.id, "Test Task", "todo", "medium"]
        );
        taskId = result.insertId;
      });

      test("updates task status and priority", async () => {
        const update = {
          userEmail: user.email,
          status: "in progress",
          priority: "high",
        };

        await request(app)
          .patch(`/api/tasks/${taskId}`)
          .send(update)
          .expect(200);

        const [task] = await pool.query(
          "SELECT status, priority FROM tasks WHERE id = ?",
          [taskId]
        );
        expect(task[0].status).toBe("in progress");
        expect(task[0].priority).toBe("high");
      });
    });
  });

  describe("File Management API", () => {
    let taskId;
    const testFilePath = path.join(__dirname, "test-files", "test.txt");

    beforeAll(async () => {
      const testDir = path.join(__dirname, "test-files");
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
      }
      fs.writeFileSync(testFilePath, "Test content");
    });

    beforeEach(async () => {
      const [result] = await pool.query(
        "INSERT INTO tasks (userId, title) VALUES (?, ?)",
        [user.id, "Test Task"]
      );
      taskId = result.insertId;
    });

    afterAll(async () => {
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
      await pool.query("DELETE FROM files WHERE taskId = ?", [taskId]);
    });

    test("uploads file successfully", async () => {
      const response = await request(app)
        .post("/api/upload")
        .field("taskId", taskId)
        .field("userEmail", user.email)
        .attach("files", testFilePath)
        .expect(200);

      expect(response.body.files).toBeDefined();
      expect(response.body.files[0].name).toBe("test.txt");
    });

    test("validates file size", async () => {
      const largeFilePath = path.join(__dirname, "test-files", "large.txt");
      const largeContent = Buffer.alloc(50 * 1024 * 1024);
      fs.writeFileSync(largeFilePath, largeContent);

      try {
        await request(app)
          .post("/api/upload")
          .field("taskId", taskId)
          .field("userEmail", user.email)
          .attach("files", largeFilePath)
          .expect(413);
      } finally {
        if (fs.existsSync(largeFilePath)) {
          fs.unlinkSync(largeFilePath);
        }
      }
    });

    test("returns files for task", async () => {
      await request(app)
        .post("/api/upload")
        .field("taskId", taskId)
        .field("userEmail", user.email)
        .attach("files", testFilePath);

      const response = await request(app)
        .post(`/api/files/${taskId}`)
        .send({ userEmail: user.email })
        .expect(200);

      expect(Array.isArray(response.body.files)).toBeTruthy();
    });

    test("deletes files for task", async () => {
      const uploadResponse = await request(app)
        .post("/api/upload")
        .field("taskId", taskId)
        .field("userEmail", user.email)
        .attach("files", testFilePath)
        .expect(200);

      const fileId = uploadResponse.body.files[0].id;

      await request(app)
        .delete(`/api/files/${fileId}`)
        .send({ userEmail: user.email })
        .expect(200);

      const [files] = await pool.query("SELECT * FROM files WHERE id = ?", [
        fileId,
      ]);
      expect(files.length).toBe(0);
    });
  });

  describe("User Profile API", () => {
    test("returns user profile", async () => {
      const response = await request(app)
        .get("/api/profile")
        .set("email", user.email)
        .expect(200);

      expect(response.body).toMatchObject({
        name: user.name,
        email: user.email,
      });
    });

    test("updates user profile", async () => {
      const update = {
        name: "Updated Name",
        emailNotifications: 1,
      };

      await request(app)
        .patch("/api/profile")
        .set("email", user.email)
        .send(update)
        .expect(200);

      const [u] = await pool.query(
        "SELECT name, emailNotifications FROM users WHERE email = ?",
        [user.email]
      );
      expect(u[0]).toMatchObject(update);
    });
  });
});
