
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('DELETE FROM categories');
  
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          name: 'Test Category',
          heroImage: './public/img/photo.jpg',
          accentColor: '#1fa5c7'
        }
      ]);
    });
};
