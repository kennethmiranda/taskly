// Import necessary modules
const express = require('express');
const connection = require('./mysql'); // Import your MySQL connection



// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route to add a task (POST /tasks)
app.post('/tasks', (req, res) => {
  const { name, status, priority, due_date, notifiable_by_email } = req.body;

  const query = `
    INSERT INTO tasks (name, status, priority, due_date, notifiable_by_email)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [name, status, priority, due_date, notifiable_by_email], (err, results) => {
    if (err) {
      console.error('Error inserting task:', err);
      return res.status(500).send('Error inserting task');
    }
    res.status(201).send('Task inserted successfully');
  });
});

// Route for the root URL '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
  });
  
  // Route for '/tasks' to retrieve all tasks
  console.log(app.get('/tasks'));
  app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving tasks:', err);
        return res.status(500).send('Error retrieving tasks');
      }
      res.json(results);  // Return all tasks as JSON
      console.log(results);
    });
  });

  
  // Start the server on port 3000
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
  
