// DDL = DEFINE = CREATE, DROP (this is below migrations file)
// DML = MANIPULATE = SELECT, UPDATE, DELETE (seeds)  --> planting seeds (populate data in database)

exports.up = function(knex) {

    return knex.schema
        .createTable('roles', (table) => {
            table.increments('id').notNullable();
            table.string('role').unique().notNullable();
        })
        .createTable('users', (table) => {
            table.increments('id').notNullable();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.integer('role_id').unsigned().notNullable();
            table.foreign('role_id').references('roles.id');

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        });
};

 //rollback
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('roles');
};