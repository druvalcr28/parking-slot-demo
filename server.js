// server.js
const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to PostgreSQL and test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Database connected");
  }
});

// Routes setup (add your route files later)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
