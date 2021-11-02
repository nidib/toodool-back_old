const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
	constructor(data, statusCode = 200) {
		super(data, statusCode, true);
	}
}

module.exports = SuccessResponse;