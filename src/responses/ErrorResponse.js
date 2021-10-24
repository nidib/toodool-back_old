const ApiResponse = require('./ApiResponse');

class ErrorResponse extends ApiResponse {
	constructor(error) {
		const data = {
			message: error.message,
			statusCode: error.statusCode
		};

		super(data, false);
	}
}

module.exports = ErrorResponse;