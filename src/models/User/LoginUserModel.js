const { loginUserSchema } = require('../../schemas/UserSchemas');
const UserModel = require('./_UserModel');

class LoginUserSchema extends UserModel {
	constructor(obj) {
		super(obj, loginUserSchema);
	}
}

module.exports = LoginUserSchema;