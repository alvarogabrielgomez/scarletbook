const db = require('../../database');
const config = require('../../../config');
const scarletEvents = require('../../scarletEvents');
const moment = require('moment');
const { Model } = require('objection');

class BaseModel extends Model{
    static get modelPaths() {
        return [__dirname];
    }
    static get idColumn() {
        return 'id';
    }
}

module.exports = {
    BaseModel
};