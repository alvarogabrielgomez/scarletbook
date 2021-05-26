
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('DELETE FROM authors');

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
        },
		{
          id: 2,
          name: 'Angela Potenza',
          email: 'angelap@accentiostudios.com',
          avatar: ''
        },
		{
          id: 3,
          name: 'Equipo de Contenido',
          email: 'hello@accentiostudios.com',
          avatar: ''
        }
      ]);
    });
};
