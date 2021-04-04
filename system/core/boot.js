/**
  * Init the SQLite DB 
  * @param {object} config      Object loaded with the nconf
  */
 async function initDatabase(config) {
    const db = require('./server/database')(config);
    // await db.doMigrations();
}

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
}

/**
 * Here happens the big bang!
 */
module.exports = async function bootSystem() {
    let config,
        server,
        database,
        theme
    try {
        // Load Config
        console.log('Loading conf');
        console.log();    
        config = require('./config');

        // Load Express Server in Maintenence Mode
        console.log('Init...');
        console.log();
        server = require('./server')(config);

        // Init Database
        await initDatabase(config);

        // Set Core
        await initCore(server, config);

        server.disable('maintenance');

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

}