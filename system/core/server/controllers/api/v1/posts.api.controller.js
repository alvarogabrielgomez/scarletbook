const ApiBaseController = require('./apiBaseController');
const { BaseModel } = require('../../../models/baseModel');
const Articles = require('../../../models/articles.model');
const knex = BaseModel.knex();

class PostsApiController extends ApiBaseController {

    async getLastEachCategory(req, res) {
        // TODO Redis
        const categories = await knex.raw(`
            SELECT ROW_NUMBER() OVER(ORDER BY id) as row_number, id, name, accent_color FROM Categories ORDER BY id
        `);
        let posts = [];
        await new Promise(async (resolve, reject) => {
            for (const category of categories) {
                const article = await knex.raw(`
                SELECT '${category.row_number}' as id, '${category.name}' as category, '${category.accent_color}' as accentColor, title, hero_image as imageUrl, './' || slug as articleUrl
                FROM Articles a
                WHERE category_id = '${category.id}'
                ORDER BY a.id DESC
                LIMIT(1)
                `)
                posts.push(article[0]);
            }
            resolve();
        });
        return res.status(200).send(posts);
    }

    async getLastThree(req, res) {
        const posts = await knex.raw(`
        SELECT ROW_NUMBER() OVER(ORDER BY a.id DESC) as id, c.name as category, a.title, a.hero_image as imageUrl, a.slug, c.accent_color
        FROM Articles a
        JOIN categories c ON
        c.id = a.category_id
        ORDER BY id DESC
        LIMIT(3)
        `);
    return res.status(200).send(posts);
    }

    async getArticles(req, res) {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let content = parseInt(req.query.content);
        let querySelect = [ 'category.name as category', 'title', 'description', 'tags', 'articles.created_at', 'articles.updated_at', 
        'slug', 'articles.id', 'articles.hero_image', 'author.name as author'];
        if(content === 1) querySelect.push('content');

        let articles = await Articles.query()
        .select(...querySelect)
        .joinRelated({ category: true, author: true })
        .page(page, limit);

        return res.status(200).send(articles);
    }

}

module.exports = PostsApiController;