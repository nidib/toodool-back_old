const { db } = require('../config/database');
const { userInfoServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');

class UserInfoServices {
	static async createUserInfo(userId) {
		db.query(queryStrings.createUserInfoQueryString, [userId]);
	}

	static async updateUserInfo(userDTO) {
		const email = userDTO.getEmail();
		const firstName = userDTO.getFirstName();
		const lastName = userDTO.getLastName();
		const nickname = userDTO.getNickname();
		const userId = userDTO.getUserId();

		db.query(queryStrings.updateUserInfoQueryString, [email, firstName, lastName, nickname, userId]);
	}
}

module.exports = UserInfoServices;