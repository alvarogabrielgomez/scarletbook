module.exports = (config) => {
    return new Promise((resolve, reject) => {
        const server = require('./express');
        server.set('name', config.get('name'));
        server.listen(config.get('server:port'), config.get('server:host'), () => {
            console.log(`🚀 ${server.get('name')} at http://${config.get('server:host')}:${config.get('server:port')}`)
            console.log();
        });
    
        resolve(server);
    })
}