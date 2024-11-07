const mysql = require("mysql2/promise");
const pool = require("backend/mysql.js");
const express = require("express");

const cors = require("cors");
const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

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

app.get("/files", (req, res) => {
  const query = "SELECT * FROM files";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving files:", err);
      return res.status(500).send("Error retrieving files");
    }
    res.json(results); // Return all files as JSON
  });
});

// Start the server on port 3002
app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
