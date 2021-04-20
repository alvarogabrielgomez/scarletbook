const BaseModel = require('./base/baseModel.model');

class Authors extends BaseModel {
    constructor() {
        super();
    }
    static get tableName(){
        return 'authors';
    }
}

module.exports = Authors;