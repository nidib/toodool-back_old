const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
	constructor(data) {
		super(data, true);
	}
}

module.exports = SuccessResponse;