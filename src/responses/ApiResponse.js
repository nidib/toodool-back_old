class ApiResponse {
	constructor(data, success) {
		this.response = { data, success };
	}
}

module.exports = ApiResponse;