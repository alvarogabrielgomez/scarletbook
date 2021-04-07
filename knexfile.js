const config = require('./system/core/config');
const packageJson = require('./package.json');
const utils = require('./system/core/shared/utils');
const { knexSnakeCaseMappers } = require('objection');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = async () => {
    let database = await require('./system/core/server/database')(config).getDbConfig()
    
    const knexFile = {};
    // knexSnakeCaseMappers is to transform tableName to table_name
    knexFile[process.env.NODE_ENV] = { ...database, ...knexSnakeCaseMappers() };

    return knexFile;
};
