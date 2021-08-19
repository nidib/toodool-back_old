class CustomError {
	constructor(initialMessage, req) {
		this.initialMessage = initialMessage;
		this.originalUrl = req.originalUrl;
		this.errorType = this.getError();

		this.message = this.errorType.message;
		this.statusCode = this.errorType.statusCode;
	}

	getError() {
		const errorTypes = [{
			message: 'Something went wrong',
			statusCode: 500
		}, {
			message: 'Unauthorized',
			statusCode: 401
		}, {
			message: 'Login already in use',
			statusCode: 409
		}, {
			message: 'Validation error',
			statusCode: 403
		}, {
			message: 'Not enough credentials',
			statusCode: 403
		}, {
			message: 'Wrong username and/or password',
			statusCode: 403
		}];

		if (this.initialMessage === 'Not Found') {
			return {
				message: `Not Found ${this.originalUrl}`,
				statusCode: 404
			};
		}

		return errorTypes.find(errorType => errorType.message === this.initialMessage) || errorTypes[0];
	}
}

module.exports = CustomError;