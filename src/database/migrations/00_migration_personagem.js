exports.up = function (knex) {
  return knex.schema
    .createTable('personagem', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('age', 100).notNullable();
      table.string('condition', 50).notNullable();
      table.string('occupation', 200).notNullable();
      table.string('image', 300).notNullable();
      table.string('genre', 25).notNullable();
      table.string('information', 3000);
    });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('personagem');
};
