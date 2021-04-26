const { generateNonce } = require('../../../shared/utils');

class BaseController {
    /**
    *  Render the html view loaded with a payload using the setted theme from the system.config.json
    *  @param {Request}  res            Request object from the Express Router
    *  @param {string}   route          Route to render
    *  @param {object}   data           Object with the data to pass it into view to render
    *  @param {integer}  statusCode     Object with the payload to pass it into view to render
    */
    view(res, route, data = null, statusCode = 200) {
        try {
        if (res.app.locals.data.website) {
                const nonce = generateNonce();
                let payload = data;
                res.status(statusCode);
                res.setHeader(
                    'Content-Security-Policy',
                    `default-src 'self'; font-src 'self' fonts.gstatic.com; img-src 'self'; script-src 'self' 'nonce-${nonce}' ; style-src 'self' fonts.googleapis.com; frame-src 'self' https://www.youtube.com`
                  );
                return res.render(route, {
                    ... payload,
                    nonce: nonce
                });
        } else {
            res.status(500);
            return res.send('Error getting theme settings.');
        }
        } catch(e) {    
            res.status(500); 
            return res.send('Error rendering theme');
        }
    }

    index(req, res) {
        return this.view(res, 'index');
    }
    
}

module.exports = BaseController;