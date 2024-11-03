// migrations/[timestamp]_add_unique_constraint_to_slot_number.js
exports.up = function (knex) {
  return knex.schema.alterTable("parking_slots", function (table) {
    // Add unique constraint to existing slot_number column
    table.unique(["slot_number"]);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("parking_slots", function (table) {
    // Remove the unique constraint
    table.dropUnique(["slot_number"]);
  });
};
