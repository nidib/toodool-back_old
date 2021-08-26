const logger = require('../config/logger');
const ErrorResponse = require('../instances/ErrorResponse');

function errorHandler(error, _req, res, _next) {
	const { response } = new ErrorResponse(error);

	return res.json(response);
}

module.exports = errorHandler;