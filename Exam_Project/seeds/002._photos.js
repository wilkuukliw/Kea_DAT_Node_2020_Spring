exports.seed = function(knex) {

      return knex('photos').insert([
        { id: '1', photo: "https://ibb.co/DG5vGbQ", description: "Swans need us" },  
      ]);

  };