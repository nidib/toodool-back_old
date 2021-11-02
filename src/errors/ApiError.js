const { errorTypes } = require('../utils/constants/errorsConstants');

class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.name = errorTypes.apiError;
		this.caughtException = true;
		this.statusCode = statusCode;
	}
}

module.exports = ApiError;