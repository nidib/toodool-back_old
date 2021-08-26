const CustomError = require('../errors/CustomError');

class ErrorResponse {
	constructor(error) {
		const { error: finalError } = new CustomError(error);

		this.success = false;
		this.error = finalError;
		this.response = this.getResponse();
	}

	getResponse() {
		return {
			error: this.error,
			success: this.success
		};
	}
}

module.exports = ErrorResponse;