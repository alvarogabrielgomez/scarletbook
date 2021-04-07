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
                let payload = data;
                res.status(statusCode);
                return res.render(route, {
                    ... payload,
                    helpers: {
                        greaterThan: function (v1, v2, options) {
                            'use strict';
                            if (v1>v2) {
                                return options.fn(this);
                            }
                            return options.inverse(this);
                        }
                    }
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