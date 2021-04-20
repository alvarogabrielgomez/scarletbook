
exports.up = function(knex) {
    return knex.schema
    .createTable('authors', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('avatar');
        table.timestamps(true, true);
    })
    .createTable('categories', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('hero_image');
        table.string('accent_color').notNullable().defaultTo('#1fa5c7');
        table.string('brand_logo').notNullable().defaultTo('./img/brand-logo-default.png');
        table.timestamps(true, true);
    })
    .createTable('articles', (table) => {
        table.increments();
        table.string('slug').notNullable().unique();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('hero_image');
        table.json('tags');
        table.string('author_id').references('id').inTable('authors').notNullable();
        table.string('category_id').references('id').inTable('categories');
        table.string('content').notNullable();
        table.timestamps(true, true);
    })
};

function dropTableIfExists(knex, table) {
    return new Promise((resolve, reject) => {
        knex.schema.hasTable(table)
            .then(exists => { 
                if(exists === true) {
                    resolve(knex.schema.dropTable(table));
                }
                resolve();
            })
    })
}

exports.down = function(knex) {
    return Promise.all([
        dropTableIfExists(knex, 'articles'),
        dropTableIfExists(knex, 'categories'),
        dropTableIfExists(knex, 'authors')
    ]);
};
