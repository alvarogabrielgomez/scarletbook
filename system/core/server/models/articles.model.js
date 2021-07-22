const { BaseModel } = require('./baseModel');
const { Model } = require('objection');
const _ = require('lodash');
const path = require('path');
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

class Articles extends BaseModel {
    constructor(title, description, heroimage, tags, createdAt, author, category, content, slug) {
        super();
        this.title = title;
        this.description = description;
        this.heroimage = heroimage;
        this.tags = tags;
        this.createdAt = createdAt;
        this.author = author;
        this.category = category;
        this.content = content;
        this.slug = slug;
    }

    static tableName = 'articles';
    static idColumn = 'id';

    static get relationMappings() {
        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'authors.model'),
                join: {
                    from: 'articles.author_id',
                    to: 'authors.id'
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'categories.model'),
                join: {
                    from: 'articles.category_id',
                    to: 'categories.id'
                }
            }
        }
    }

    /**
    * Gets the article using the slug in the database
    * @param {object} slug       The slug of the article
    */
    static async get(slug) {
        // Getting from Database using Objection.js
        let querySelect = [ 'category.name as category', 'title', 'description', 'tags', 'articles.created_at', 'articles.updated_at', 
        'slug', 'articles.id', 'articles.hero_image', 'author.name as author', 'content'];
        let data = await this.query()
        .select(...querySelect)
        .joinRelated({ category: true, author: true })
        .where({ slug });

        // If exists
        if (data[0]) {
            // Parse tags JSON object
            data[0].tags = JSON.parse(data[0].tags);
            // Parse Markdown string into html string
            data[0].content = md.render(data[0].content);
            // Just in case
            data = JSON.parse(JSON.stringify(data[0]));
        } else {
            // Return null to controller
            data = null;
        }
        return data;
    }

    static async getAllByTag(tag) {
        let querySelect = [ 'category.name as category', 'title', 'description', 'tags', 'articles.created_at', 'articles.updated_at', 
        'slug', 'articles.id', 'articles.hero_image', 'author.name as author'];
        let data = await this.query()
        .select(...querySelect)
        .joinRelated({ category: true, author: true })
        .where('tags', 'like', `%${tag}%`);
        
        return data;
    }

    /**
    * Returns an instance of Article with the content loaded into it.
    * @param {object} content        A object with the markdown content parsed with the yaml-front-matter.
    */
    load(content) {
        this.title = content.title || '';
        this.description = content.description || '';
        this.createdAt = content.createdAt ? content.createdAt.toLocaleDateString() : '';
        this.author = content.author || '';
        this.category = content.category || '';
        this.tags = content.tags ? (content.tags.length > 0 ? content.tags : []) : []
        this.heroimage = content.heroimage || ''
        this.body = content.body || ''; 
        this.slug = content.slug;
            
        return this;
    }

}

module.exports = Articles;