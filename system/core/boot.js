/**
  * Init the Scarlet Core
  * @param {object} server      Object loaded with the express server
  * @param {object} config      Object loaded with the nconf
  */
 async function initCore(server, config) {
    //Test
    server.get("/", (req, res, next) => {
        res.json({"message":"Ok"})
    });
    // 0 Create ScarletEvent
    const scarletEvents = require('./server/scarletEvents');
    // 1 Load Cache Settings
    // 2 Setting Theme
    // 3 Setting Router
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
        console.log('⚙️  Loading configurations...');
        console.log();    
        config = require('./config');

        // Load Express Server in Maintenence Mode
        console.log('☕️ Loading express server in maintenence mode...');
        console.log();
        server = await require('./server')(config);

        // Init Database
        console.log('📦 Setting SQLite3 Database...');
        console.log();
        database = await require('./server/database')();

        // Set Core
        console.log('🧬 Initializing Scarlet Core...');
        console.log();
        await initCore(server, config);

        // Init completed, disabling maintenence mode
        console.log('✅ Init complete, disabling maintenence mode...');
        console.log();
        server.disable('maintenance');

        console.log(`🏁 Done! => http://${config.get('server:host')}:${config.get('server:port')}`);
        console.log();

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

}