const path = require('path');
const Website = require('./server/models/website.model');
const _ = require('lodash');

function setTheme(server, website) {
    return new Promise((resolve, reject) => {
        // Getting theme name and absolute path
        let themeSelected = website.theme;
        const themePath = path.join(__dirname, `./frontend/themes/${themeSelected}`);

        // Set theme views into express app
        server.set('views', themePath);

        // Publish theme styles and scripts
        server.use('/css', require('express').static(`${themePath}/styles`));
        server.use('/js', require('express').static(`${themePath}/scripts`));

        // Create Handlebars instance
        var exphbs  = require('express-handlebars');
        var hbs = exphbs.create({
            extname: '.hbs',
            defaultLayout: false,
            helpers: {
                foo: function () { return 'FOO BOOT!'; },
                bar: function () { return 'BAR BOOT!'; }
            }
        });

        // Save website default metadata into app locals
        server.locals.data = {
            website: website
        };
        
        // Set handlebars engine into express app
        server.engine('.hbs', hbs.engine);
        server.set('view engine', '.hbs');

        // Done
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