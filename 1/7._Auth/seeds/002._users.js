exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'admin', password: "root", role_id: 1 },
  ]);
};