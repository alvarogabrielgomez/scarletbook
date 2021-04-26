const { BaseModel } = require('./baseModel');

class Authors extends BaseModel {
    constructor() {
        super();
    }
    static get tableName(){
        return 'authors';
    }
}

module.exports = Authors;