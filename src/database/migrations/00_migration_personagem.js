exports.up = function (knex) {
  return knex.schema
    .createTable('personagem', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.integer('age').notNullable();
      table.string('condition', 50).notNullable();
      table.string('nationality', 200).notNullable();
      table.string('genre', 25).notNullable();
    });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('personagem');
};
