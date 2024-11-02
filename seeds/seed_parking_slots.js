// seeds/[timestamp]_seed_parking_slots.js
exports.seed = function (knex) {
  return knex("parking_slots")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex("parking_slots").insert([
        { slot_number: 1, is_occupied: false },
        { slot_number: 2, is_occupied: false },
        { slot_number: 3, is_occupied: false },
        { slot_number: 4, is_occupied: true },
        { slot_number: 5, is_occupied: false },
      ]);
    });
};
