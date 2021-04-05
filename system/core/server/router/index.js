const routes = [
    { path: '/', router: './web/blog.router' }
];

class RouterRegister {
    constructor(server, website) {
        this.server = server,
        this.website = website
    }
    get() { return routes; } 

    register() {
        routes.forEach(item => {
            this.server.use(item.path, require(item.router)(this.website));
        })
    }
}

module.exports = (server, website) => new RouterRegister(server, website);
    