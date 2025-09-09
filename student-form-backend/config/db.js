const mysql = require("mysql2");
const path = require("path");

// Correct path: go one level up from config/
const envFile = process.env.DOCKER_ENV === "true" ? ".env.docker" : ".env.local";
require("dotenv").config({ path: path.resolve(__dirname, "..", envFile) });

// Debug: check if env variables are loaded
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

// Create MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Test connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ MySQL connected");
    conn.release();
  }
});

module.exports = db;
