const path = require('path');
const Website = require('./server/models/website.model');

function setTheme(server, website) {
    return new Promise((resolve, reject) => {
        const themeSelected = website.theme;
        server.set('view engine', 'ejs');
        server.set('views', path.join(__dirname, `./front/themes/${themeSelected}/views`));
        resolve();
    })
}


/**
  * Init the Scarlet Core
  * @param {object} server      Object loaded with the express server
  * @param {object} config      Object loaded with the nconf
  */
 async function initCore(server, config, database) {
    return new Promise(async (resolve, reject) => {
        
        // 0 Load Website Config
        const website = new Website(config.get('website'));

        // 1 Load Cache Settings
    
        // 2 Setting Theme
        await setTheme(server, website);
    
        // 3 Setting Router
        require('./server/router')(server, website, database).register();
        
        resolve();
    })
}

/**
 * Here happens the big bang!
 */
module.exports = async function bootSystem() {
    let config,
        server,
        database;

    try {
        // Load Config
        console.log('⚙️  - Loading configurations...');
        console.log();    
        config = require('./config');

        // Load Express Server in Maintenence Mode
        console.log('☕️ - Loading express server in maintenence mode...');
        console.log();
        server = await require('./server')(config);

        // Init Database
        console.log('📦 - Setting SQLite3 Database...');
        console.log();
        const dbFunctions = await require('./server/database')(config);
        database = await dbFunctions.getDb();

        // Migrations
        if(config.get('migrate')) {
            await dbFunctions.doMigration();
        }
        if(config.get('seed')) {
            await dbFunctions.seed();
        }

        // Set Core
        console.log('🧬 - Initializing Scarlet Core...');
        console.log();
        await initCore(server, config, database);

        // Init completed, disabling maintenence mode
        console.log('✅ - Init complete, disabling maintenence mode...');
        console.log();
        server.disable('maintenance');

        console.log(`🏁 - Done! => http://${config.get('server:host')}:${config.get('server:port')}`);
        console.log();

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

}