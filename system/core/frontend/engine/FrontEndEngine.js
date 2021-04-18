const path = require('path');
const config = require('../../config');

class FrontEndEngine {
    /**
    * Create the handlebars instance with the helpers in it
    */
    createHsb() {
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
    
        return hbs;
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
    * Configure the Theme selected
    */
    setTheme(hbsInstance, server) {
        return new Promise((resolve, reject) => {
            // Getting theme absolute path
            const themePath = path.join(this.themeDirectory, this.themeName);
        
            // Set theme views into express app
            server.set('views', themePath);
        
            // Publish theme styles and scripts
            server.use('/css', require('express').static(`${themePath}/styles`));
            server.use('/js', require('express').static(`${themePath}/scripts`));
            
        
            if (config.get('env') !== 'production') {
                hbsInstance.handlebars.logger.level = 0;
            }

            // Save website default metadata into app locals
            server.locals.data = {
                website: this.websiteMetadata
            };
                
            // Set handlebars engine into express app
            server.engine('.hbs', hbsInstance.engine);
            server.set('view engine', '.hbs');
        
            // Done
            resolve(server);
        })
    }
}

module.exports = () => new FrontEndEngine();