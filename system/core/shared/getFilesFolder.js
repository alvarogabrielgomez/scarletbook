const fs = require('fs');
const path = require('path');

/**
  * Read all files in the same directory
  * @param {object} dir      directory to search
  * @param {object} ext      Extension of the file to list
  * @param {object} ignore   List of files to ignore
  */
 function getFilesFolder (dir, ext, ignore) {
    const objects = {};

    const files = fs.readdirSync(dir, {
        withFileTypes: true 
    }).filter(dirent => dirent.isFile()).map(dirent => dirent.name);

    files.forEach((file) => {
        if (file.includes(ignore)) { return; }
        
        if (path.extname(file) === `.${ext}`) {
            let name = path.parse(file).name
            return objects[name] = require(path.join(dir, file));
        }
    });

    return objects;
};

module.exports = getFilesFolder;