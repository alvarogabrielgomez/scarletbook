class RouterRegister {

    get routes() { 
        return [
            { path: '/', router: './web/blog.router' }
        ];
    } 

    registerRoutes(server) {
        this.routes.forEach(item => {
            server.use(item.path, require(item.router)());
        })
    }
}

module.exports = () => new RouterRegister();
    