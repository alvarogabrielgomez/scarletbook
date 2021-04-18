const coreHelpers = require('../helpers');

/**
* Help to register the helper into Handlebars engine
*/
class RegisterHelper {
    constructor(hsbInstance) {
        this.hsbInstance = hsbInstance;
    }

    /**
    * Register async
    */
    asyncRegister(name, fn) {
        return new Promise((resolve, reject) => {
            try {
                this.hsbInstance.handlebars.registerHelper(name, fn);
                resolve();
            }
            catch(e) {
                reject(e);
            }
        });
    }

    registerAllHelpers(){
        Object.keys(coreHelpers).forEach(async (key, index) => {
            await this.asyncRegister(key, coreHelpers[key]);
        });
    }
}

module.exports = (hsbInstance) => new RegisterHelper(hsbInstance);