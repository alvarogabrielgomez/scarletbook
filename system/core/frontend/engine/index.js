const coreHelpers = require('../helpers');
const path = require('path');
const config = require('../../config');

/**
* Create the handlebars instance with the helpers in it
*/
class FrontEndEngine {
    constructor() {
        // Create Handlebars instance
        this.exphbs = require('express-handlebars');
        this.hbsInstance = this.exphbs.create({
            extname: '.hbs',
            defaultLayout: false,
            helpers: {
                foo: function () { return 'FOO BOOT!'; },
                bar: function () { return 'BAR BOOT!'; }
            }
        });
    }

    /**
    * Get the selected theme name
    */
    get themeName() {
        return config.get('website:theme:name');
    }

    get themeDirectory() {
        return config.get('website:theme:directory');
    }

    get websiteMetadata() {
        return config.get('website');
    }

    /**
    * Register Helpers async
    * Help to register the helper into Handlebars engine
    */
     asyncRegister(name, fn) {
        const _this = this;
        return new Promise((resolve, reject) => {
            try {
                _this.hbsInstance.handlebars.registerHelper(name, fn);
                resolve();
            }
            catch(e) {
                reject(e);
            }
        });
    }

    /**
    * Register all helpers async
    */
     registerAllHelpers(){
        Object.keys(coreHelpers).forEach(async (key, index) => {
            await this.asyncRegister(key, coreHelpers[key]);
        });
    }

    /**
    * Configure the Theme selected
    */
    setTheme(server) {
        return new Promise(async (resolve, reject) => {

            // Set all helpers
            await this.registerAllHelpers();

            // Getting theme absolute path
            const themePath = path.join(this.themeDirectory, this.themeName);
        
            // Set theme views into express app
            server.set('views', themePath);
        
            // Publish theme styles and scripts
            server.use('/css', require('express').static(`${themePath}/styles`, {
                maxAge: '24hr'
            }));
            server.use('/js', require('express').static(`${themePath}/scripts`, {
                maxAge: '1hr'
            }));
            
        
            if (config.get('env') !== 'production') {
                this.hbsInstance.handlebars.logger.level = 0;
            }

            // Save website default metadata into app locals
            server.locals.data = {
                website: this.websiteMetadata
            };
                
            // Set handlebars engine into express app
            server.engine('.hbs', this.hbsInstance.engine);
            server.set('view engine', '.hbs');
        
            // Done
            resolve(server);
        })
    }
}

module.exports = () => new FrontEndEngine();