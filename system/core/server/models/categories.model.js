const BaseModel = require('./base/baseModel.model');

class Categories extends BaseModel {
    constructor() {
        super();
    }
    static get tableName(){
        return 'categories';
    }
}

module.exports = Categories;