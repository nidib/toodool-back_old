const { createUserSchema } = require('../../schemas/UserSchemas');
const UserModel = require('./_UserModel');

class CreateUserModel extends UserModel {
	constructor(obj) {
		super(obj, createUserSchema);
	}
}

module.exports = CreateUserModel;