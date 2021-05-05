var url = require('url');

module.exports = function getCurrentURL(options) {
    const req = options.req;
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
      });
}