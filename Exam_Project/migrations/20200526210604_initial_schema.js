// DDL = DEFINE = CREATE, DROP (this is below migrations file)
// DML = MANIPULATE = SELECT, UPDATE, DELETE (seeds)  --> planting seeds (populate data in database)

exports.up = function(knex) {

    return knex.schema

        .createTable('users', (table) => {
            table.increments('id').notNullable();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })

        .createTable('photos', (table) => {
            table.increments('id').notNullable();
            table.binary('photo').notNullable();
            table.string('description').notNullable();
        });
        
};

 //rollback
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('roles');
};