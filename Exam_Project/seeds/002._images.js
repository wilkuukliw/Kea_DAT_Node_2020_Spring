exports.seed = function(knex) {

      return knex('images').insert([
        { id: '1', image: "https://ibb.co/DG5vGbQ"},  
      ]);
  };