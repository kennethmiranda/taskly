const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

console.log(process.env.DB_HOST);

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // The name of the database to use for this connection
  port: 3306, // The default port
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = connection;
