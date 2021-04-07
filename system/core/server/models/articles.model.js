const { BaseModel } = require('./base/baseModel');
const { Model } = require('objection');
const _ = require('lodash');

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

    static get tableName(){
        return 'articles';
    }

    static async getPost(slug) {
        let data = await this.query().where({ slug });
        data[0].tags = JSON.parse(data[0].tags);
        return JSON.parse(JSON.stringify(data[0]));
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