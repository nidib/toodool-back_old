const { Router } = require('express');
const toodoolRoutes = require('./toodool/toodoolRoutes');
const userRoutes = require('./user/userRoutes');

const api = Router();

api.use('/users', userRoutes);
api.use('/toodools', toodoolRoutes);

module.exports = api;