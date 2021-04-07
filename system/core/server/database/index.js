const knex = require('knex');
const path = require('path');
const utils = require('../../shared/utils');
const utilNode = require('util');
const exec = utilNode.promisify(require('child_process').exec);
const { Model } = require('objection');

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
                Model.knex(knexInstance);
                resolve(knexInstance);
            }
            resolve(knexInstance);
        });
    }
    
    function doMigration(knexInstance){
        // Enter to dir from App
        process.chdir(process.cwd());
        return new Promise(async (resolve, reject) => {
            try {
                console.log('📝 - Migrating database...');
                console.log();
                await exec('./node_modules/knex/bin/cli.js migrate:latest');
                console.log('✅ - Database Migrated.');
                console.log();
                resolve(knexInstance); 
            } catch (e) {
                try {
                    // Try rollback
                    console.error('📝 - ERROR: Rolling back...');
                    console.log();
                    await exec('./node_modules/knex/bin/cli.js migrate:rollback');
                    reject(e);
                } catch (e2) {
                    console.error('📝 - ERROR: Cant be rollbacked');
                    console.log();
                    reject({e2, e});
                }
            }
        })
    }

    function seed() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('📝 - Seeding database...');
                console.log();
                await exec('./node_modules/knex/bin/cli.js seed:run');
                console.log('✅ - Database seeded.');
                console.log();
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    return {
        getDb,
        getDbConfig,
        doMigration,
        seed
    }
}
