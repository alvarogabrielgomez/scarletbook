const { BaseModel } = require('./baseModel');

class Categories extends BaseModel {
    constructor() {
        super();
    }
    static get tableName(){
        return 'categories';
    }
}

module.exports = Categories;