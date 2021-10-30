const { errorTypes } = require('../utils/constants/errorsConstants');

class ApiError extends Error {
	constructor(message) {
		super(message);

		this.name = errorTypes.apiError;
		this.caughtException = true;
	}
}

module.exports = ApiError;