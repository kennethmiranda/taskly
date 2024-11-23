const mysql = require("mysql2/promise");
const pool = require("backend/mysql.js");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    createParentPath: true,
  })
);

// helper function to get userId from email
async function getUserIdFromEmail(email) {
  const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);
  if (!rows || rows.length === 0) {
    throw new Error(`User not found for email: ${email}`);
  }
  return rows[0].id;
}

// Route for the root URL '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});

// get tasks for specific user
app.get("/api/tasks", async (req, res) => {
  const userEmail = req.query.userEmail;

  if (!userEmail) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const userId = await getUserIdFromEmail(userEmail);
    const [results] = await pool.query(
      "SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC",
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

// create task
app.post("/api/tasks", async (req, res) => {
  const { userEmail, title, description, dueDate, status, priority } = req.body;

  if (!userEmail) {
    return res.status(400).json({ error: "userEmail is required" });
  }

  try {
    const userId = await getUserIdFromEmail(userEmail);

    function getLocaleDate() {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date.toISOString().slice(0, 19).replace("T", " ");
    }
    const formattedCreatedAt = getLocaleDate();
    const formattedDueDate = dueDate
      ? new Date(dueDate).toISOString("en-US").slice(0, 19).replace("T", " ")
      : null;

    // Create query to insert task into database
    const insertQuery = `
    INSERT INTO tasks (userId, title, description, createdAt, dueDate, status, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const [result] = await pool.query(insertQuery, [
      userId,
      title,
      description,
      formattedCreatedAt,
      formattedDueDate,
      status,
      priority,
    ]);

    // Respond with the inserted task details
    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: result.insertId,
        userId,
        title,
        description,
        createdAt: formattedCreatedAt,
        dueDate: formattedDueDate,
        status,
        priority,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.message.includes("User not found")) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Failed to create task" });
    }
  }
});

// delete task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.headers.userid;

  try {
    // First verify the task belongs to the user
    const [task] = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    // If verification passes, delete the task
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ? AND userId = ?",
      [id, userId]
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update task
app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.headers.userid;

  const { title, description, dueDate, status, priority } = req.body;

  try {
    // First verify the task belongs to the user
    const [task] = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    // Build dynamic query based on which attributes are being updated
    let updateFields = [];
    let updateValues = [];

    if (title !== undefined) {
      updateFields.push("title = ?");
      updateValues.push(title);
    }
    if (description !== undefined) {
      updateFields.push("description = ?");
      updateValues.push(description);
    }
    if (dueDate !== undefined) {
      const formattedDueDate = dueDate
        ? new Date(dueDate).toISOString().slice(0, 19).replace("T", " ")
        : null;
      updateFields.push("dueDate = ?");
      updateValues.push(formattedDueDate);
    }
    if (status !== undefined) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }
    if (priority !== undefined) {
      updateFields.push("priority = ?");
      updateValues.push(priority);
    }

    // If there are no fields to update, return an error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    // Final SQL query to update the task
    const updateQuery = `
      UPDATE tasks
      SET ${updateFields.join(", ")}
      WHERE id = ? AND userId = ?
    `;

    // Add the task id to the values array for the WHERE clause
    updateValues.push(id, userId);

    const [result] = await pool.query(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get specific task for user
app.get("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const userEmail = req.query.userEmail;

  if (!userEmail) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const userId = await getUserIdFromEmail(userEmail);
    const [results] = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

// static files from public/uploads
app.use(
  "/uploads",
  cors(),
  express.static(path.join(__dirname, "public", "uploads"))
);

// uploads directory
const uploadDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// get user profile
app.get("/api/profile", async (req, res) => {
  const userEmail = req.headers.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const [results] = await pool.query(
      "SELECT name, email, emailNotifications, avatar FROM users WHERE email = ?",
      [userEmail]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// profile settings update
app.patch("/api/profile", async (req, res) => {
  const { name, emailNotifications, avatar } = req.body;
  const userEmail = req.headers.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const userId = await getUserIdFromEmail(userEmail);
    const updateQuery = avatar
      ? "UPDATE users SET name = ?, emailNotifications = ?, avatar = ? WHERE email = ?"
      : "UPDATE users SET name = ?, emailNotifications = ? WHERE email = ?";
    const updateParams = avatar
      ? [name, emailNotifications, avatar, userEmail]
      : [name, emailNotifications, userEmail];
    const [result] = await pool.query(updateQuery, updateParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// profile picture upload
app.post("/api/avatar", async (req, res) => {
  const userEmail = req.headers.email;

  if (!userEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.avatar;

  // Validate file type
  const fileExtension = path.extname(file.name).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension)) {
    return res
      .status(400)
      .json({ error: "Invalid file type. Only images are allowed." });
  }

  try {
    const [user] = await pool.query("SELECT id FROM users WHERE email = ?", [
      userEmail,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const filename = `${userEmail}-${file.name}`;
    const filepath = path.join(uploadDir, filename);
    const avatarUrl = `http://localhost:3002/uploads/${filename}`;

    // Save the file
    await file.mv(filepath);

    // Update database with new avatar URL
    await pool.query("UPDATE users SET avatar = ? WHERE email = ?", [
      avatarUrl,
      userEmail,
    ]);

    res.json({ avatar: avatarUrl });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Failed to update avatar" });
  }
});

//second patch for changing dates for calendar.
app.patch("/api/tasks/test/:id", async (req, res) => {
  const taskId = req.params.id;
  const { dueDate } = req.body;

  const formattedDate = new Date(dueDate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET dueDate = ? WHERE id = ?",
      [formattedDate, taskId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Task not found");
    }

    res.status(200).send("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Error updating task");
  }
});

// Start the server on port 3002
app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
