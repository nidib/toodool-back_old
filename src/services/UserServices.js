const camelize = require('camelize');
const database = require('../config/database');
const { userServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');
const UserInfoServices = require('./UserInfoServices');

class UserServices {
	static async getUserByUsername(username) {
		const result = await database.query(queryStrings.selectUserByUsernameQueryString, [username]);

		if (!result.rows.length) {
			return undefined;
		}

		return camelize(result.rows[0]);
	}

	static async createOne(username, password) {
		const result = await database.query(queryStrings.createUserQueryString, [username, password]);
		const { id } = result.rows[0];

		UserInfoServices.createUserInfo(id);
	}

	static async getInfo(userId) {
		const result = await database.query(queryStrings.getUsernameWithInfo, [userId]);

		if (!result.rows.length) {
			return null;
		}

		return camelize(result.rows[0]);
	}
}

module.exports = UserServices;