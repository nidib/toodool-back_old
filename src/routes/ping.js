const { Router } = require('express');

const ping = Router();

ping.get('/', (req, res) => res.status(200).json({}));

module.exports = ping;