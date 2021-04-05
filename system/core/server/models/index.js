const fs = require('fs').promises;
const path = require('path');

exports = module.exports;

async function init() {
    await fs.readdir('./', { withFileTypes: true })
        .forEach(item => {
            if(item.isFile() && path.extname(item.name) === '.js'){
                Object.assign(exports, require(`./${item.name}`));
            }
    });
}

module.exports = init();