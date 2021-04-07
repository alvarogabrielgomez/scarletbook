
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('DELETE FROM authors');

  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {
          name: 'Alvaro Gabriel',
          email: 'alvaro@accentiostudios.com',
          avatar: ''
        }
      ]);
    });
};
