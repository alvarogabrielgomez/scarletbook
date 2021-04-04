const knex = require('knex');
const config = require('../../config');
const path = require('path');
let knexInstance;

function getDbPath(){
    const cfg = config.get('database');
    let dbConfig;
    if (cfg && cfg.hasOwnProperty('connection')) {
        // Transform to absolute path
        cfg.connection.filename = path.join(process.cwd(), cfg.connection.filename);
        dbConfig = cfg;
        dbConfig.useNullAsDefault = true;
    }
    return dbConfig;
}

module.exports = () => {
    return new Promise((resolve, reject) => {
        if (!knexInstance && config.get('database')) {
            knexInstance = knex(getDbPath());
        }
        resolve(knexInstance);
    })
}

module.exports.doMigrations = async function doMigrations() {

}