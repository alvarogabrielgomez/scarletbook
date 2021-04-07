
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('DELETE FROM articles');

  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
          slug: 'test-article',
          title: 'Test Article Migrated',
          description: 'Test Article Migrated Description',
          heroImage: './public/img/stock1.jpg',
          tags: JSON.stringify(['Tag1', 'Tag2']),
          authorId: '1',
          categoryId: '1',
          content: 'TEST CONTENT'
        },
      ]);
    });
};
