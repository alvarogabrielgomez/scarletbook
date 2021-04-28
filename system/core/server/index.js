const config = require('../config');

module.exports = () => {
    return new Promise((resolve, reject) => {
        const server = require('./express');
        server.set('title', config.get('website:title'));
        server.listen(config.get('server:port'), config.get('server:host'), () => {
            console.log(`🚀 - ${server.get('title')} at http://${process.env.HOST || config.get('server:host')}:${process.env.PORT || config.get('server:port')}`)
            console.log();
        });
    
        resolve(server);
    })
}