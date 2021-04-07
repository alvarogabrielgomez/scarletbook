const BaseModel = require('./base/baseModel.model');

class Author extends BaseModel {
    constructor() {
        super();
    }
    static get tableName(){
        return 'authors';
    }
}

module.exports = Author;