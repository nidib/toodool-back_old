const CustomError = require('../instances/CustomError');
const ErrorResponse = require('../instances/ErrorResponse');

function errorHandler(error, req, res, _next) {
	const { message, statusCode } = new CustomError(error.message, req);
	const response = new ErrorResponse(message);

	res.statusCode = statusCode;

	return res.json(response);
}

module.exports = errorHandler;