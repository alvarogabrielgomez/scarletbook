const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { maintenanceMiddleware } = require('../shared/utils');
const app = express();
app.use(helmet()); // Sending various http headers
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('maintenance', true);
app.use('/public', express.static(path.join(process.cwd(), './content/public')));
app.use(maintenanceMiddleware);

module.exports = app;