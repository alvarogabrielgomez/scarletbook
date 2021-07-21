const getFilesFolder = require('../../shared/getFilesFolder');

const middlewares = getFilesFolder(__dirname, 'js', ['index']);

module.exports = middlewares;