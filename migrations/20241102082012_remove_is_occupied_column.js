// migrations/[timestamp]_remove_is_occupied_column.js
exports.up = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.dropColumn("is_occupied");
  });
};

exports.down = function (knex) {
  return knex.schema.table("parking_slots", function (table) {
    table.boolean("is_occupied").defaultTo(false);
  });
};
