class ApiResponse {
	constructor(data, statusCode, success = true) {
		this.response = { data, statusCode, success };
	}
}

module.exports = ApiResponse;