
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1, 
          name: 'Test Category',
          heroImage: './public/img/photo.jpg',
          accentColor: '#1fa5c7'
        }
      ]);
    });
};
