
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('DELETE FROM categories');
  
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1,
          name: 'Web Develop',
          heroImage: './public/img/photo.jpg',
          accentColor: '#1fa5c7',
          brandLogo: './public/logo-header-1.png' 
        },
        {
          id: 2,
          name: 'UX Design',
          heroImage: './public/img/photo.jpg',
          accentColor: '#d81927',
          brandLogo: './public/logo-header-2.png'
        },
        {
          id: 3,
          name: 'Web Tech',
          heroImage: './public/img/photo.jpg',
          accentColor: '#45d6ce',
          brandLogo: './public/logo-header-3.png'
        },
        {
          id: 4,
          name: 'News',
          heroImage: './public/img/photo.jpg',
          accentColor: '#1fa5c7',
          brandLogo: './public/logo-header-1.png' 
        },
      ]);
    });
};
