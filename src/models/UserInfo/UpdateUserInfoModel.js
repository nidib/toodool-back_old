const { updateUserInfoSchema } = require('../../schemas/UserInfoSchemas');
const UserInfoModel = require('./_UserInfoModel');

class UpdateUserInfoModel extends UserInfoModel {
	constructor(obj) {
		super(obj, updateUserInfoSchema);
	}
}

module.exports = UpdateUserInfoModel;