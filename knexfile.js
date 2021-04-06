const config = require('./system/core/config');
const packageJson = require('./package.json');
const utils = require('./system/core/shared/utils');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = async () => {
    let database = await require('./system/core/server/database')(config).getDbConfig()
    
    const knexFile = {};
    knexFile[process.env.NODE_ENV] = database;

    return knexFile;
};
