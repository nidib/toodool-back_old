const { createToodoolSchema } = require('../../schemas/ToodoolSchemas');
const ToodoolModel = require('./_ToodoolModel');

class CreateToodoolModel extends ToodoolModel {
	constructor(obj) {
		super(obj, createToodoolSchema);
	}
}

module.exports = CreateToodoolModel;