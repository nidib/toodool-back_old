class ApiResponse {
	constructor(data = null, statusCode = null, success = true) {
		this.data = data;
		this.statusCode = statusCode;
		this.success = success;
	}
}

module.exports = ApiResponse;