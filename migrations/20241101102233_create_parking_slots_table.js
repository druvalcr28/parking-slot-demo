// migrations/[timestamp]_create_parking_slots_table.js
exports.up = function (knex) {
  return knex.schema.createTable("parking_slots", function (table) {
    table.increments("id").primary();
    table.integer("slot_number").notNullable();
    table.boolean("is_occupied").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("parking_slots");
};
