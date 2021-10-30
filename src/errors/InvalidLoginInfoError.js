const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class InvalidLoginInfoError extends ApiError {
	constructor() {
		super(errorMessages.INVALID_LOGIN_INFO);

		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

module.exports = InvalidLoginInfoError;