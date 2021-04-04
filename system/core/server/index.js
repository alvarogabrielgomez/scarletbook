module.exports = (config) => {
    const server = require('./express');
    server.set('name', config.get('name'));
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`🚀 ${server.get('name')} listening at http://localhost:${port}`)
    });

    return server;
}