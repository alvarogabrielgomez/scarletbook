
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
          id: 1, 
          slug: 'test-article',
          title: 'Test Article Migrated',
          description: 'Test Article Migrated Description',
          heroImage: './public/img/stock1.jpg',
          tags: '{}',
          authorId: '1',
          categoryId: '1',
          content: 'TEST CONTENT'
        },
      ]);
    });
};
