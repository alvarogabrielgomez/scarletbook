const config = require('./system/core/config');
const packageJson = require('./package.json');
const utils = require('./system/core/shared/utils');
const { knexSnakeCaseMappers } = require('objection');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const databaseTools = require('./system/core/server/database/databaseTools')();

module.exports = async () => {
    let databaseConfig = config.get('database');
    
    const knexFile = {};
    // knexSnakeCaseMappers is to transform tableName to table_name
    knexFile[process.env.NODE_ENV] = { ...databaseConfig, ...knexSnakeCaseMappers() };

    return knexFile;
};
