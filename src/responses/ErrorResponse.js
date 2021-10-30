const ApiResponse = require('./ApiResponse');

class ErrorResponse extends ApiResponse {
	constructor(error) {
		const data = { message: error.message };

		super(data, error.statusCode, false);
	}
}

module.exports = ErrorResponse;