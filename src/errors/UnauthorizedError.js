const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class UnauthorizedError extends ApiError {
	constructor() {
		super(errorMessages.UNAUTHORIZED);

		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

module.exports = UnauthorizedError;