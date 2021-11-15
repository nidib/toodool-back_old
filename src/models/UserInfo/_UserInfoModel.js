const { schemaValidator } = require('../../config/schemaValidator');
const ValidationError = require('../../errors/ValidationError');

class UserInfoModel {
	constructor(obj, schema) {
		this.id = obj.id || null;
		this.userId = obj.userId || null;
		this.email = obj.email || null;
		this.firstName = obj.firstName || null;
		this.lastName = obj.lastName || null;
		this.nickname = obj.nickname || null;

		schema && this.validate(schema);
	}

	validate(schema) {
		const validator = schemaValidator(schema);
		const valid = validator(this);

		if (!valid) {
			throw new ValidationError();
		}
	}

	getUserId() {
		return this.userId;
	}

	getId() {
		return this.id;
	}

	getEmail() {
		return this.email;
	}

	getFirstName() {
		return this.firstName;
	}

	getLastName() {
		return this.lastName;
	}

	getNickname() {
		return this.nickname;
	}
}

module.exports = UserInfoModel;