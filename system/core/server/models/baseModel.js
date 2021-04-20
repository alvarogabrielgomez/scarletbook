const scarletEvents = require('../scarletEvents');
const moment = require('moment');
const path = require('path');
const { Model, snakeCaseMappers } = require('objection');


class BaseModel extends Model{
    static get modelPaths() {
        return [__dirname];
    }
    static get idColumn() {
        return 'id';
    }
    static get columnNameMappers() {
        return snakeCaseMappers();
    }

}

module.exports = {
    BaseModel
};