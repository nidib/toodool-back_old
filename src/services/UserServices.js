const { db } = require('../config/database');
const { userServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');
const UserInfoServices = require('./UserInfoServices');

class UserServices {
	static async getUserByUsername(username) {
		const result = await db.query(queryStrings.selectUserByUsernameQueryString, [username]);

		if (result.rows.length === 0) {
			return null;
		}

		return result.rows[0];
	}

	static async createOne(username, password) {
		const result = await db.query(queryStrings.createUserQueryString, [username, password]);
		const { id } = result.rows[0];

		UserInfoServices.createUserInfo(id);
	}

	static async getInfo(userId) {
		const result = await db.query(queryStrings.getUsernameWithInfo, [userId]);

		if (result.rows.length === 0) {
			return null;
		}

		return result.rows[0];
	}
}

module.exports = UserServices;