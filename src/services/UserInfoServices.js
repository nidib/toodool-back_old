const database = require('../config/database');
const { userInfoServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');

class UserInfoServices {
	static async createUserInfo(userId) {
		database.query(queryStrings.createUserInfoQueryString, [userId]);
	}

	static async updateUserInfo(userDTO) {
		const email = userDTO.getEmail();
		const firstName = userDTO.getFirstName();
		const lastName = userDTO.getLastName();
		const nickname = userDTO.getNickname();
		const userId = userDTO.getUserId();

		database.query(queryStrings.updateUserInfoQueryString, [email, firstName, lastName, nickname, userId]);
	}
}

module.exports = UserInfoServices;