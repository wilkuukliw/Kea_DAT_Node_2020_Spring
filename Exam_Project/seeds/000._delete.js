exports.seed = function(knex) {
    return knex('users', 'photos').del();
}

//not sure if can be deleted in one goal
// knex - sql query builder