const coreMiddlewares = require('../middlewares');

/**
 * Register all the middlewares in the folder
 * @param {object} appExpress      The express app instance
 */
function registerAllMiddlewares(appExpress) {
    return new Promise(async (resolve, reject) => {
        console.log('🐵 - Registering middlewares...');
        console.log();
        await Object.keys(coreMiddlewares).forEach(async (key) => {
            const middleware = coreMiddlewares[key]();
            if (middleware.path) {
                appExpress.use(middleware.path, await middleware.funcs);
            } else {
                appExpress.use(await middleware.funcs);
            }
        });
        resolve();
    });
}

module.exports = registerAllMiddlewares;