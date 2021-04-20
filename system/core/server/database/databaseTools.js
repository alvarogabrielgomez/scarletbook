const knex = require('knex');
const path = require('path');
const utils = require('../../shared/utils');
const utilNode = require('util');
const exec = utilNode.promisify(require('child_process').exec);
const { Model } = require('objection');
const config = require('../../config');

class DatabaseTools {

    /**
    * Get the knex instance and load the Objection Model with it
    */
    getDb(){
        return new Promise((resolve, reject) => {
            let knexInstance;
            const configDb = config.get('database');
            if (!knexInstance && configDb) {
                knexInstance = knex(configDb);
                Model.knex(knexInstance);
                resolve(knexInstance);
            }
            resolve(knexInstance);
        });
    }
    
    /**
    * Execute the Migrations
    */
    doMigration(knexInstance) {
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

    /**
    * Execute the Seeding process
    */
    seed() {
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
}

module.exports = () => new DatabaseTools();