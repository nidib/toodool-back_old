const { Router } = require('express');

const ping = Router();

ping.get('/', (_req, res) => {
	return res.status(200).json({});
});

module.exports = ping;