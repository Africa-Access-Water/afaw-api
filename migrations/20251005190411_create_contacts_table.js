exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable();
    table.text("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("contacts");
};
