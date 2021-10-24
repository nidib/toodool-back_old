class ApiError extends Error {
	constructor(message) {
		super(message);

		this.name = 'ApiError';
		this.caughtException = true;
	}
}

module.exports = ApiError;