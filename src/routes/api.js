const { Router } = require('express');

const api = Router();

api.use('/company', (req, res) => res.status(200).json({}));

module.exports = api;