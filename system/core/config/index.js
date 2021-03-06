const nconf = require('nconf');
const path = require('path');
const utils = require('../shared/utils');
const env = process.env.NODE_ENV || 'development';
// var fs = require('fs');
// const os = require('os');

const scarletConfigPath = __dirname;
const localConfigPath = process.cwd();

function loadConfig() {

    nconf.argv()
    .env();
    nconf.file(`local-${env}`, path.join(localConfigPath, `config.${env}.json`));
    nconf.file(`local-defaults`, path.join(localConfigPath, `config.defaults.json`));
    nconf.file('scarletbook', path.join(scarletConfigPath, 'config.scarletbook.json'));

    nconf.set('env', env);
    nconf.set('assetsFolder', path.normalize(path.join(process.cwd(), '/system/core/server/scarletbook')));

    // Transform all relative path to absolute path
    nconf.makePathsAbsolute = utils.makePathsAbsolute.bind(nconf);

    nconf.makePathsAbsolute(nconf.get('website'), 'website');
    nconf.makePathsAbsolute(nconf.get('database'), 'database');


    return nconf;
}

module.exports = loadConfig();
module.exports.loadConfig = loadConfig;