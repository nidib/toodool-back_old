const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class ToodoolAlreadyExistsError extends ApiError {
	constructor() {
		super(errorMessages.TOODOOL_ALREADY_EXISTS);

		this.statusCode = StatusCodes.CONFLICT;
	}
}

module.exports = ToodoolAlreadyExistsError;