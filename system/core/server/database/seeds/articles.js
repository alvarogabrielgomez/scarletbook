
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
          content: '## Title\r\n# Subtitle\r\n**bold text** *italicized text*\r\n\r\n```sh\r\nnpx ac-create-web my-app --install\r\ncd my-app\r\nnpm run dev\r\n```\r\n\r\n1. First item\r\n2. Second item\r\n3. Third item\r\n\r\n### My Great Heading {#custom-id}\r\n\r\n- [x] Write the press release\r\n- [ ] Update the website\r\n- [ ] Contact the media\r\n\r\n[LINK](https:\/\/www.example.com)\r\n\r\n`Lorem ipsum` dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna pizza. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\r\n\r\n| Syntax | Description |\r\n| ----------- | ----------- |\r\n| Header | Title |\r\n| Paragraph | Text \r\n\r\n![tag](.\/public\/img\/stock1.jpg)\r\n\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna pizza. Ut enim ad minim veniam, quis \r\n'
        },
      ]);
    });
};
