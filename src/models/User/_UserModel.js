const { schemaValidator } = require('../../config/schemaValidator');
const ValidationError = require('../../errors/ValidationError');

class UserModel {
	constructor(obj, schema) {
		this.id = obj.id || null;
		this.username = obj.username || null;
		this.password = obj.password || null;

		schema && this.validate(schema);
	}

	validate(schema) {
		const validator = schemaValidator(schema);
		const valid = validator(this);

		if (!valid) {
			throw new ValidationError();
		}
	}

	getId() {
		return this.id;
	}

	getUsername() {
		return this.username;
	}

	getPassword() {
		return this.password;
	}
}

module.exports = UserModel;