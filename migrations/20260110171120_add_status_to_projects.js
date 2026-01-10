/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('projects', (table) => {
    table
      .string('status')
      .notNullable()
      .defaultTo('draft');
  });

  // Optional: enforce allowed values
  await knex.raw(`
    ALTER TABLE projects
    ADD CONSTRAINT projects_status_check
    CHECK (status IN ('upcoming', 'ongoing', 'completed', 'draft', 'cancelled'))
  `);
};

exports.down = async function (knex) {
  await knex.schema.alterTable('projects', (table) => {
    table.dropColumn('status');
  });
};
