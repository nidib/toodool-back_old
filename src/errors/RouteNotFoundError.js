const { StatusCodes } = require('http-status-codes');
const ApiError = require('./ApiError');

const ROUTE_NOT_FOUND = 'Route not found';

class RouteNotFoundError extends ApiError {
	constructor(url) {
		const finalMessage = url ? `${ROUTE_NOT_FOUND}: ${url}` : ROUTE_NOT_FOUND;

		super(finalMessage);

		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

module.exports = RouteNotFoundError;