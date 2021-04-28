const utilNode = require('util');
const exec = utilNode.promisify(require('child_process').exec);

/**
* Execute the Migrations
*/
function doMigration() {
    // Enter to dir from App
    process.chdir(process.cwd());
    return new Promise(async (resolve, reject) => {
        try {
            console.log('📝 - Migrating database...');
            console.log();
            await exec('./node_modules/knex/bin/cli.js migrate:latest');
            console.log('✅ - Database Migrated.');
            console.log();

            if(process.argv[2]) {
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
            }

            resolve(); 
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

doMigration();