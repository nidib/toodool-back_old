class ErrorResponse {
	constructor(message) {
		this.success = false;
		this.error = true;
		this.message = message;
	}
}

module.exports = ErrorResponse;