var debug = require('debug')('scarletbook:boot');

/**
  * Init the Scarlet Core
  * @param {object} server      Object loaded with the express server
  */
 async function initCore(server) {
    return new Promise(async (resolve, reject) => {

        // 1 Setting Theme
        const frontend = require('./frontend/engine')();
        await frontend.setTheme(server);

        // 2 Setting Router
        const routerRegister = require('./server/router')();
        routerRegister.registerRoutes(server);
        
        resolve();
    })
}

/**
 * Here happens the big bang!
 */
module.exports = async function bootSystem() {
    let server, database;
    let bootbefore, boottook;
    try {
        // Init hrtime
        before = process.hrtime();

        // Load Config

        console.log('⚙️ - Loading configurations...');
        console.log();    
        config = require('./config');

        if (config.get('nodemon')) {
            console.log('⚙️ - Running in watch mode...');
            console.log();   
        };

        // Load Express Server in Maintenence Mode
        console.log('☕️ - Loading express server in maintenence mode...');
        console.log();
        server = await require('./server')();

        // process.exit(0);

        // Init Database
        console.log('📦 - Setting SQLite3 Database...');
        console.log();
        const databaseTools = require('./server/database/databaseTools')();
        database = await databaseTools.getDb();

        // Migrations
        if(config.get('migrate')) {
            await databaseTools.doMigration(database);
        }
        if(config.get('seed')) {
            await databaseTools.seed(database);
        }

        // Set Core
        console.log('🧬 - Initializing Scarlet Core...');
        console.log();
        await initCore(server);

        // Init completed, disabling maintenence mode
        console.log('✅ - Init complete, disabling maintenence mode...');
        console.log();
        server.disable('maintenance');

        console.log(`🏁 - Done! => http://localhost:${config.get('server:port')}`);
        console.log();

        took = process.hrtime(before);
        debug('Boot Time ', took);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

}