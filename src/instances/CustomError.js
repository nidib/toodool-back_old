const errorTypes = require('../constants/errorTypes');

class CustomError {
	constructor(initialMessage, req) {
		this.initialMessage = initialMessage;
		this.originalUrl = req.originalUrl;
		this.errorType = this.getError();

		this.message = this.errorType.message;
		this.statusCode = this.errorType.statusCode;
	}

	getError() {
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