// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.createUser(username, password);
  res.status(201).json(user.rows[0]);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.getUserByUsername(username);

  if (user.rows.length === 0)
    return res.status(404).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword)
    return res.status(401).json({ message: "Invalid password" });

  res.json({ message: "Login successful" });
};

module.exports = { signup, login };
