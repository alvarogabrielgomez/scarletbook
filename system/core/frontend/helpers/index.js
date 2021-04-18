const fs = require('fs');
const path = require('path');

const helpers = {};

const helperFiles = fs.readdirSync(__dirname, {
    withFileTypes: true 
}).filter(dirent => dirent.isFile()).map(dirent => dirent.name);

helperFiles.forEach((helper) => {
    if (helper === 'index.js') { return; }
    if (path.extname(helper) === '.js') {
        let name = helper.replace(/.js$/, '');
        return helpers[name] = require(path.join(__dirname, helper));
    }
});

module.exports = helpers;