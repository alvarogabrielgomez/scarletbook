const express = require("express");
const router = express.Router();
const config = require('../../config/');

class RobotsTxtMiddleware {

    get path() {
        return '/robots.txt';
    }

    get funcs() {
        return [
            (req, res, next) => {
                try {
                    let txt = "User-agent: * \n"
                    txt += `Sitemap: ${new URL('/sitemap.xml', config.get('website:url')).href} \n`;
                    txt += "Disallow: /scarletbook/ \n"
                    // txt += "Allow: //"
            
                    res.setHeader('Content-Type', 'text/plain')
                    res.status(200);
                    res.end(txt);
                } catch (e) {
                    next(e);
                }
            },
        ]
    }
}

module.exports = () => new RobotsTxtMiddleware();
