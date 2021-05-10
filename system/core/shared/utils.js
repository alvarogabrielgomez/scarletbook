const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const isObject = require('lodash/isObject');
const isString = require('lodash/isString');
var url = require('url');
var os = require( 'os' );

exports.getLocalIP = function getLocalIP() {
    var networkInterfaces = os.networkInterfaces();
    var arr = networkInterfaces['Local Area Connection 3']
    var ip = arr[1].address
}

exports.maintenanceMiddleware = function maintenanceMiddleware (req, res, next) {
    if (!req.app.get('maintenance')) {
        return next();
    }
    res.set({
        'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    });
    res.writeHead(503, {'content-type': 'text/html'});
    fs.createReadStream(path.resolve(__dirname, '../frontend/scarletbook/maintenance.html')).pipe(res);
};

exports.convertToAbsolutePath = function convertToAbsolutePath (_path) {
    return path.join(process.cwd(), _path);
}

function matchKeyName(key) {
    if (key === 'filename' || key === 'directory' || key === 'path') {
        return true;
    }
    return false;
}

exports.generateNonce = function generateNonce() {
    let nonce = crypto.randomBytes(16).toString('base64');
    return nonce;
}

exports.setCSPHeaders = function setCSPHeaders(req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        `default-src 'self'; font-src 'self' fonts.gstatic.com; img-src 'self'; script-src 'self' ; style-src 'self' fonts.googleapis.com; frame-src 'self' https://www.youtube.com`
      );
    next();
}

/**
 * Transform nconf paths into absolute path
 * 
 * All Paths must start with "/", that is relative to root of the project
 * And the key must be "directory", "path", or "filename"
 * Otherwise will be ignored
 */
exports.makePathsAbsolute = function makePathsAbsolute(JSON, parent = null) {
    const _this = this;
    Object.keys(JSON).forEach((key, index) => {
        //  Is an Object with more keys inside
        if(isObject(JSON[key])) {
            makePathsAbsolute.bind(_this)(JSON[key], `${parent}:${key}`);
        }
        else if (matchKeyName(key) && isString(JSON[key]) && JSON[key].match(/\/+|\\+/)) {
            // console.log(`${parent ? `${parent}:${key}` : key}: ${JSON[key]}`);
            _this.set(`${parent}:${key}`, path.normalize(path.join(process.cwd(), JSON[key])));
            // console.log('Transformed!: ', _this.get(`${parent}:${key}`));
        } else {
            // console.log(`${parent ? `${parent}.${key}` : key}: ${JSON[key]}`);
        }
    })
}

exports.setHeaders = function setHeaders(req, res, next) {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.nonce = nonce;
    res.setHeader('Cache-Control', 'max-age=86400, public');
    res.setHeader(
        'Content-Security-Policy',
        `default-src 'self' https://*.fontawesome.com/ ; font-src 'self' fonts.gstatic.com https://*.fontawesome.com/; img-src 'self' imgur.com i.imgur.com ; script-src 'self' 'nonce-${nonce}' https://*.fontawesome.com/ https://*.cloudflare.com/' ; style-src 'self' fonts.googleapis.com 'unsafe-inline' ; frame-src 'self' https://www.youtube.com https://giphy.com/`
    );
	next();
}

exports.getCurrentUrl = function getCurrentUrl(req, res, next) {
    const currentUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
      });
    res.currentUrl = currentUrl;
    next();
}