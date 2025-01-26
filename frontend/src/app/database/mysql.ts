import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
// replace with your own path to the .env.local file

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: 3306,
});

export default pool;
