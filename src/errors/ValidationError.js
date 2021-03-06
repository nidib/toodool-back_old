const { StatusCodes } = require('http-status-codes');
const { errorMessages } = require('../utils/constants/errorsConstants');
const ApiError = require('./ApiError');

class ValidationError extends ApiError {
	constructor() {
		super(errorMessages.VALIDATION_ERROR, StatusCodes.FORBIDDEN);
	}
}

module.exports = ValidationError;