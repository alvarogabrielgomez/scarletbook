
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {
          id: 1, 
          name: 'Alvaro Gabriel',
          email: 'alvaro@accentiostudios.com',
          avatar: ''
        }
      ]);
    });
};
