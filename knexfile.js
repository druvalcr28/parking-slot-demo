// knexfile.js
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
  // You can add other environments (staging, production) if needed
};
