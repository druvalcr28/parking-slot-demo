// config/db.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database");
  }
});

module.exports = pool;
