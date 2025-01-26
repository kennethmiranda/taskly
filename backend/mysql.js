const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

// Create a connection to the MySQL database
const pool = mysql.createPool({
  host: process.env.DBHOST, // Use the environment variable
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true, // Wait for a connection to become available
  connectionLimit: 10, // Max number of connections in pool
  queueLimit: 0, // Max number of connection requests
});

module.exports = pool;
