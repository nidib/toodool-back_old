const errorTypes = require('../constants/errorTypes');

class CustomError {
	constructor(error) {
		this.name = error.name;
		this.message = error.message;
		this.error = this.getError();
	}

	getError() {
		const error = errorTypes.find(item => item.name === this.name) || errorTypes[0];
		const message = error.message || this.message;

		return {
			...error,
			message
		};
	}
}

module.exports = CustomError;