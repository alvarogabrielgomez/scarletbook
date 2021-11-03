const path = require('path');
const getFilesFolder = require('../../shared/getFilesFolder');

const viewsControllers = getFilesFolder(path.join(__dirname, './web'), 'js', ['base.controller']);
const apiControllers = getFilesFolder(path.join(__dirname, './api'), 'js', ['base.api.controller']);

/**
 * Register all the controllers in the folder
 * @param {object} appExpress      The express app instance
 */
 function registerAllControllers(appExpress) {
    return new Promise(async (resolve, reject) => {
        console.log('🎮 - Registering Controllers...');
        console.log();
        
        // Views Controllers
        await Object.keys(viewsControllers).forEach(async (key) => {
            const views = viewsControllers[key]();
            appExpress.use(views.path, await views.funcs);
        });

        // Api Controllers
        await Object.keys(apiControllers).forEach(async (key) => {
            const apis = apiControllers[key]();
            appExpress.use(apis.path, await apis.funcs);
        });

        resolve();
    });
 }

module.exports = {
    registerAllControllers
};

exports.apiControllers = apiControllers;
exports.viewsControllers = viewsControllers;