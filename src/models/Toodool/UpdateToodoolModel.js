const { updateToodoolSchema } = require('../../schemas/ToodoolSchemas');
const ToodoolModel = require('./_ToodoolModel');

class UpdateToodoolModel extends ToodoolModel {
	constructor(obj) {
		super(obj, updateToodoolSchema);
	}
}

module.exports = UpdateToodoolModel;