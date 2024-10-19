// Import necessary modules
const mysql = require("mysql2");
const express = require("express");
const pool = mysql.createPool({
  host: 'localhost', // Change to your MySQL host if needed
  user: 'root', // Your MySQL username
  password: '6351812aa!', // Your MySQL password
  database: 'sys', // The database you want to connect to
  waitForConnections: true, // Wait for a connection to become available
  connectionLimit: 10, // Max number of connections in pool
  queueLimit: 0 // Max number of connection requests
});

// Create an Express application
const cors = require('cors');
const app = express();


// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

/*
// Define a route to add a task (POST /tasks)
app.post("/tasks", (req, res) => {
  const { name, status, priority, due_date, notifiable_by_email } = req.body;

  const query = `
    INSERT INTO tasks (name, status, priority, due_date, notifiable_by_email)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [name, status, priority, due_date, notifiable_by_email],
    (err, results) => {
      if (err) {
        console.error("Error inserting task:", err);
        return res.status(500).send("Error inserting task");
      }
      res.status(201).send("Task inserted successfully");
    }
  );
});
*/

// Route for the root URL '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});

//Route to create task
app.post("/api/tasks", async (req, res) => {
  const { id, userId, title, description, createdAt, status, priority } = req.body;
  
  // Create query to insert task into database
  const insertQuery = `
    INSERT INTO tasks (id, userId, title, description, createdAt, status, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    pool.query(
      insertQuery,
      [id, userId, title, description, createdAt, status, priority],
      (err, results) => {
        if (err) {
          console.error("Error creating task:", err);
          return res.status(500).json({ error: "Failed to create task" });
        }

        // Respond with the inserted task details
        res.status(201).json({ message: "Task created successfully", task: { id, userId, title, description, createdAt, status, priority } });
      }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Route for '/tasks' to retrieve all tasks
app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving tasks:", err);
      return res.status(500).send("Error retrieving tasks");
    }
    res.json(results); // Return all tasks as JSON
    console.log(results);
  });
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

//Route to delete task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM tasks WHERE id = ?";

  pool.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    //Returns message if task is not found.
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    //Task deleted.
    res.status(200).json({ message: "Task deleted successfully" });
  });
});





// Start the server on port 3002
app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
