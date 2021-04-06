const routes = [
    { path: '/', router: './web/blog.router' }
];

class RouterRegister {
    constructor(server, website, database) {
        this.server = server,
        this.website = website,
        this.database = database
    }
    get() { return routes; } 

    register() {
        routes.forEach(item => {
            this.server.use(item.path, require(item.router)(this.website, this.database));
        })
    }
}

module.exports = (server, website) => new RouterRegister(server, website);
    