var compression = require('compression');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const utils = require('../shared/utils');
const registerAllMiddlewares = require('./utils/registerAllMiddlewares');
const app = express();
const oneHour = 3600000; 

app.use(compression());
app.use(helmet()); // Sending various http headers

app.enable('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Set Maintenance mode ON
app.set('maintenance', true);

registerAllMiddlewares(app);

app.use(utils.generateNonce);

app.use(utils.setHeaders);

app.use(utils.getCurrentUrl);

// Publish content/public folder to /public path
app.use('/public', express.static(path.join(process.cwd(), './content/public'), {
    maxAge: '4h'
}));

// Publish internal scarletbook files to to root path
app.use('/', express.static(path.resolve(__dirname, './scarletbook/public'), {
    maxAge: '4h'
}));


module.exports = app;