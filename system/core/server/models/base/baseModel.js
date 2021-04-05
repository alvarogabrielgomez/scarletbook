const db = require('../../database');
const config = require('../../../config');
const scarletEvents = require('../../scarletEvents');
const moment = require('moment');

class BaseModel {
    constructor() {

    }

    test() {
        console.log('Test Base Model Inherited');
    }
}

module.exports = BaseModel;