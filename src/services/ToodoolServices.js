const { db } = require('../config/database');
const { toodoolServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');

class ToodoolServices {
	static async createOne(toodoolDTO) {
		const userId = toodoolDTO.getUserId();
		const title = toodoolDTO.getTitle();
		const description = toodoolDTO.getDescription();

		db.query(queryStrings.createToodoolQueryString, [title, description, userId]);
	}

	static async getToodoolsByUser(userId) {
		const result = await db.query(queryStrings.getToodolsByUserQueryString, [userId]);
		const toodools = result.rows;

		return toodools;
	}

	static async getToodoolByUserAndId(userId, id) {
		const result = await db.query(queryStrings.getToodoolByUserAndIdQueryString, [userId, id]);
		let toodool;

		if (result.rows.length === 0) {
			return null;
		}

		[toodool] = result.rows;

		return toodool;
	}

	static async getToodoolByUserAndTitle(userId, title) {
		const result = await db.query(queryStrings.selectToodoolByUserAndTitleQueryString, [userId, title]);

		if (result.rows.length === 0) {
			return false;
		}

		return true;
	}

	static async updateToodol(toodoolDTO) {
		const id = toodoolDTO.getId();
		const completed = toodoolDTO.getCompleted();
		const title = toodoolDTO.getTitle();
		const description = toodoolDTO.getDescription();
		const userId = toodoolDTO.getUserId();

		db.query(queryStrings.updateToodoolQueryString, [completed, title, description, userId, id]);
	}

	static async deleteToodool(toodoolDTO) {
		const id = toodoolDTO.getId();
		const userId = toodoolDTO.getUserId();

		db.query(queryStrings.deleteToodoolQueryString, [id, userId]);
	}
}

module.exports = ToodoolServices;