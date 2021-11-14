const ValidationError = require('../../errors/ValidationError');
const { schemaValidator } = require('../../config/schemaValidator');

function _getCompleted(completed) {
	if (completed === true || completed === false) {
		return completed;
	}

	return null;
}

class ToodoolModel {
	constructor(obj, schema) {
		this.id = obj.id || null;
		this.userId = obj.userId || null;
		this.title = obj.title || null;
		this.description = obj.description || null;
		this.completed = _getCompleted(obj.completed);

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

	getUserId() {
		return this.userId;
	}

	getCompleted() {
		return this.completed;
	}

	getTitle() {
		return this.title;
	}

	getDescription() {
		return this.description;
	}
}

module.exports = ToodoolModel;