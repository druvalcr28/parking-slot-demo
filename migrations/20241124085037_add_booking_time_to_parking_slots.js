// migrations/[timestamp]_add_booking_time_to_parking_slots.js

exports.up = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.timestamp("booking_time").nullable(); // Adds a nullable timestamp column for booking time
  });
};

exports.down = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.dropColumn("booking_time"); // Removes the booking_time column
  });
};
