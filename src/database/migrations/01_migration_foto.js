exports.up = function (knex) {
  return knex.schema
    .createTable('foto', (table) => {
      table.increments('id');
      table.string('originalname', 255).notNullable();
      table.string('filename', 255).notNullable();

      table.integer('personagem_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('personagem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('foto');
};
