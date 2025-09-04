const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ MySQL connected");
    conn.release();
  }
});

module.exports = db;
