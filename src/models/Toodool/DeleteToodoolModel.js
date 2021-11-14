const { deleteToodoolSchema } = require('../../schemas/ToodoolSchemas');
const ToodoolModel = require('./_ToodoolModel');

class UpdateToodoolModel extends ToodoolModel {
	constructor(obj) {
		super(obj, deleteToodoolSchema);
	}
}

module.exports = UpdateToodoolModel;