const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class RouteNotFoundError extends ApiError {
	constructor(url, method) {
		const finalMessage = `${errorMessages.ROUTE_NOT_FOUND}: [${method}] ${url}`;

		super(finalMessage, StatusCodes.NOT_FOUND);
	}
}

module.exports = RouteNotFoundError;