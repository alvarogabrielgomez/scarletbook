const nconf = require('nconf');
const path = require('path');
const utils = require('../shared/utils');
const env = process.env.NODE_ENV || 'development';
// var fs = require('fs');
// const os = require('os');

const defaultConfigPath = __dirname;
const localConfigPath = process.cwd();

function loadConfig() {

    nconf.argv()
    .env();
    nconf.file('local', path.join(localConfigPath, `config.${env}.json`));
    nconf.file('defaults', path.join(defaultConfigPath, 'config.defaults.json'));

    nconf.set('env', env);

    // Transform all relative path to absolute path
    nconf.makePathsAbsolute = utils.makePathsAbsolute.bind(nconf);

    nconf.makePathsAbsolute(nconf.get('website'), 'website');
    nconf.makePathsAbsolute(nconf.get('database'), 'database');


    return nconf;
}

module.exports = loadConfig();
module.exports.loadConfig = loadConfig;