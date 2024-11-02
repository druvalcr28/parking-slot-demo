// seeds/[timestamp]_seed_parking_slots.js
exports.seed = function (knex) {
  return knex("parking_slots")
    .del() // Deletes ALL existing entries
    .then(function () {
      // Inserts seed entries
      return knex("parking_slots").insert([
        { slot_number: 1, booked_by: null }, // Available
        { slot_number: 2, booked_by: null }, // Available
        { slot_number: 3, booked_by: null }, // Available
        { slot_number: 4, booked_by: 3 },
        { slot_number: 5, booked_by: null }, // Available
        { slot_number: 6, booked_by: null }, // Available
        { slot_number: 7, booked_by: 5 },
        { slot_number: 8, booked_by: null }, // Available
        { slot_number: 9, booked_by: null }, // Available
        { slot_number: 10, booked_by: null }, // Available
      ]);
    });
};
