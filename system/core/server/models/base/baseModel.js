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
    
    find() {
        console.log('Find');
    }
}

module.exports = BaseModel;