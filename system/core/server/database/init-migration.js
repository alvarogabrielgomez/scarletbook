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

exports.up = async function(knex) {
    return Promise.all([
        knex.schema
        .createTable('authors', (table) => {
            table.uuid('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('avatar');
            table.timestamps(true, true);
        }),
        knex.schema
        .createTable('categories', (table) => {
            table.uuid('id').primary();
            table.string('name').notNullable();
            table.string('hero_image');
            table.string('accent_color').notNullable().defaultTo('#1fa5c7');
            table.timestamps(true, true);
        }),
        knex.schema
        .createTable('articles', (table) => {
            table.uuid('id').primary();
            table.string('slug').notNullable().unique();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.string('hero_image');
            table.json('tags');
            table.timestamps(true, true);
            table.string('author_id').references('id').inTable('authors').notNullable();
            table.string('category_id').references('id').inTable('categories');
            table.string('content').notNullable();
        })
    ]);
}

exports.down = async function(knex) {
    return Promise.all([
        dropTableIfExists(knex, 'articles'),
        dropTableIfExists(knex, 'categories'),
        dropTableIfExists(knex, 'authors')
    ]);
}