const express = require('express');
const path = require('path');
const helmet = require('helmet');
const utils = require('../shared/utils');
const app = express();
app.use(helmet()); // Sending various http headers

app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Set Maintenance mode ON
app.set('maintenance', true);

// Publish content/public folder to /public path
app.use('/public', express.static(path.join(process.cwd(), './content/public')));

// Publish internal scarletbook files to to root path
app.use('/', express.static(path.resolve(__dirname, './public')));
app.use(utils.maintenanceMiddleware);

app.use((req, res, next) => {
	const accentioProxy = req.headers['x-accentio-proxy'];
	if(accentioProxy) {
		res.append('X-Accentio-Proxy', req.headers['x-accentio-proxy']);
	}
	next();
})

module.exports = app;