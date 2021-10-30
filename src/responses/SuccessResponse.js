const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
	constructor(data = null, statusCode = 200) {
		super(data, statusCode, true);
	}
}

module.exports = SuccessResponse;