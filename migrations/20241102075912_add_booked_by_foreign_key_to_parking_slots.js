// migrations/[timestamp]_add_booked_by_column_to_parking_slots.js
exports.up = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.integer("booked_by").unsigned().nullable(); // Add the booked_by column
    table
      .foreign("booked_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL"); // Add foreign key constraint
  });
};

exports.down = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.dropForeign("booked_by"); // Remove foreign key constraint
    table.dropColumn("booked_by"); // Drop the booked_by column
  });
};
