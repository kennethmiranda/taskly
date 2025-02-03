const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const createPool = () => {
  if (process.env.DATABASE_URL) {
    return mysql.createPool({
      uri: process.env.DATABASE_URL,
    });
  }

  return mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: process.env.PORT,
  });
};

const pool = createPool();

module.exports = pool;
