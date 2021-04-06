class BaseController {
    constructor(website, database) {
        this.website = website;
        this.database = database;
    }

    /**
    *  Render the html view loaded with a payload using the setted theme from the system.config.json
    *  @param {Request}  res            Request object from the Express Router
    *  @param {string}   route          Route to render
    *  @param {object}   data           Object with the data to pass it into view to render
    *  @param {integer}  statusCode     Object with the payload to pass it into view to render
    */
    view(res, route, data = null, statusCode = 200) {
        try {
        if (this.website) {
                let payload = {};
                payload.website = this.website;
                payload.data = data;
                res.status(statusCode);
                return res.render(route, payload);
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