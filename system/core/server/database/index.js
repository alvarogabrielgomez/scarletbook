const knex = require('knex');
const path = require('path');
const utils = require('../../shared/utils');
const migrate = require('./init-migration');

module.exports = (config) => {    
    
    /**
     * Prepare the configurations to connect to database
     * @returns 
     */
    
    function getDbConfig(){
        let database = config.get('database');
        if (database && database.hasOwnProperty('connection')) {
            // Transform to absolute path
            database.connection.filename = utils.convertToAbsolutePath(database.connection.filename);
            database.migrations.directory = utils.convertToAbsolutePath(database.migrations.directory);
            database.seeds.directory = utils.convertToAbsolutePath(database.seeds.directory);
            database.useNullAsDefault = true;
        }
        return database;
    }
    
    function getDb(){
        return new Promise((resolve, reject) => {
            let knexInstance;
            if (!knexInstance && config.get('database')) {
                knexInstance = knex(getDbConfig());

                if(config.get('migrate')) {
                    resolve(doMigration(knexInstance));
                }
                resolve(knexInstance);
            }
            resolve(knexInstance);
        });
    }
    
    function doMigration(knexInstance){
        return new Promise(async (resolve, reject) => {
                await migrate.down(knexInstance);
                await migrate.up(knexInstance);
                console.log('✅ Database Migrations done.');
                console.log();
                resolve(knexInstance); 
        })
    }

    return {
        getDb,
        getDbConfig,
        doMigration
    }
}
