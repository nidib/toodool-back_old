const { Router } = require('express');
const api = require('./api');
const ping = require('./ping');

const routes = Router();

routes.use('/api/v1', api);
routes.use('/ping', ping);

module.exports = routes;