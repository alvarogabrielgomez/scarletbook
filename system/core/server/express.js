const express = require('express');
const helmet = require('helmet');
const { maintenanceMiddleware } = require('../shared/utils');
const app = express();
app.use(helmet()); // Sending various http headers
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('maintenance', true);
app.use('/public', express.static('../../../content/public'));
app.use(maintenanceMiddleware);

module.exports = app;