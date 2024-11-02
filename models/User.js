// models/User.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
};

const getUserByUsername = (username) => {
  return db.query("SELECT * FROM users WHERE username = $1", [username]);
};

module.exports = { createUser, getUserByUsername };
