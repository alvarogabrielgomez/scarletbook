module.exports = (config) => {
    return new Promise((resolve, reject) => {
        const server = require('./express');
        server.set('title', config.get('website:title'));
        server.listen(config.get('server:port'), config.get('server:host'), () => {
            console.log(`🚀 - ${server.get('title')} at http://${config.get('server:host')}:${config.get('server:port')}`)
            console.log();
        });
    
        resolve(server);
    })
}