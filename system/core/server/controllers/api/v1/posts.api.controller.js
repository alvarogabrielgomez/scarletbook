const ApiBaseController = require('./apiBaseController');
const { BaseModel } = require('../../../models/baseModel');
const Articles = require('../../../models/articles.model');
const knex = BaseModel.knex();
const debug = require('debug')('scarletbook:controllers:api:v1:posts');
const jsStringEscape = require('js-string-escape');
const hljs = require('highlight.js');
const lazy_loading = require('markdown-it-image-lazy-loading');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if(lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {
                    language: lang
                }).value;
            } catch(e) {}
        }
        return ''; // use external default escaping
    }
});
md.use(lazy_loading, {
    image_size: true
});

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
                SELECT '${category.row_number}' as id, '${category.name}' as category, '${category.accent_color}' as accentColor, a.title, a.hero_image as imageUrl, '/' || a.slug as articleUrl
                FROM Articles a
                WHERE category_id = '${category.id}'
                ORDER BY a.id DESC
                LIMIT(1)
                `)
                if (article[0]) {
                    posts.push(article[0]);
                }
            }
            resolve();
        });
        return res.status(200).send(posts);
    }

    async getLastThree(req, res) {
        const posts = await knex.raw(`
        SELECT a.id as id, c.name as category, c.accent_color as accentColor, a.title, a.hero_image as imageUrl, '/' || slug as articleUrl
        FROM Articles a
        JOIN categories c ON
        c.id = a.category_id
        ORDER BY a.id DESC
        LIMIT(3)
        `);
    
    return res.status(200).send(posts);
    }

    async getArticles(req, res) {
        var before, str, pos, res, took;

        before = process.hrtime();
        let distinctArticleId = parseInt(req.query.distinct);
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        if (limit) { limit = limit <= 9 ? limit : 9 } // 9 is the max.
        
        let content = parseInt(req.query.content);
        let querySelect = [ 'category.name as category', 'title', 'description', 'tags', 'articles.created_at', 'articles.updated_at', 
        'slug', 'articles.id', 'articles.hero_image', 'author.name as author'];
        if(content === 1) { querySelect.push('content') };

        let articles = await Articles.query()
        .select(...querySelect)
        .where('articles.id', '<>', distinctArticleId.toString())
        .joinRelated({ category: true, author: true })
        .orderBy('articles.id', 'desc')
        .page(page, limit);

        if (articles.results.length > 0) {
            articles.results.forEach((article) => {
              article.description = jsStringEscape(article.description);
                if(content === 1) {
                    // Parse Markdown string into html string
                    article.content = md.render(article.content);
                }
            });
        }

        took = process.hrtime(before);
        debug('getArticles took', took);
        return res.status(200).send(articles);
    }

}

module.exports = PostsApiController;