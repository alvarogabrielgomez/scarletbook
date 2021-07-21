const fs = require('fs');
const path = require('path');

class MaintenanceMiddleware {
    get funcs() {
        return [
            (req, res, next) => {
                if (!req.app.get('maintenance')) {
                    return next();
                }
                res.set({
                    'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
                });
                res.writeHead(503, {'content-type': 'text/html'});
                fs.createReadStream(path.resolve(__dirname, '../../frontend/scarletbook/maintenance.html')).pipe(res);
            }
        ]
    }
}

module.exports = () => new MaintenanceMiddleware();
