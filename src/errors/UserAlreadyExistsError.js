const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class UserAlreadyExistsError extends ApiError {
	constructor() {
		super(errorMessages.USER_ALREADY_EXISTS);

		this.statusCode = StatusCodes.CONFLICT;
	}
}

module.exports = UserAlreadyExistsError;