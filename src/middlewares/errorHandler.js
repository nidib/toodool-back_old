const logger = require('../config/logger');
const ErrorResponse = require('../responses/ErrorResponse');
const { isProduction } = require('../utils/helpers/environmentHelpers');

const GENERIC_ERROR = { message: 'Something went wrong', statusCode: 500 };

function errorHandler(error, _req, res, _next) {
	const errorToResponse = error.caughtException ? error : GENERIC_ERROR;
	const response = new ErrorResponse(errorToResponse);

	if (!isProduction()) {
		logger.info(error.stack);
	}

	return res.status(errorToResponse.statusCode).json(response);
}

module.exports = errorHandler;