const { apiControllers, viewsController } = require('../controllers');

class RouterRegister {

    get routes() { 
        return [
            { path: '/', router: './web/blog.router' },
            { path: '/api', router: './api/posts.api.router.js' }

        ];
    } 

    registerRoutes(server) {
        this.routes.forEach(item => {
            server.use(item.path, require(item.router)());
        })
    }
}

module.exports = () => new RouterRegister();
    