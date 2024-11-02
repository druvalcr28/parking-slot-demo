// seeds/[timestamp]_seed_users.js
exports.seed = function (knex) {
  return knex("users")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user1", password: "hashedpassword1" }, // Use hashed passwords
        { username: "user2", password: "hashedpassword2" },
      ]);
    });
};
