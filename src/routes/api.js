const { Router } = require('express');

const api = Router();

api.get('/', (req, res) => {
	return res.status(200).json({});
});

module.exports = api;