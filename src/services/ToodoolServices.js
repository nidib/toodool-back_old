const database = require('../config/database');
const { toodoolServicesQueryStrings: queryStrings } = require('../utils/constants/queryStringConstants');

class ToodoolServices {
	static async createOne(toodoolDTO) {
		const userId = toodoolDTO.getUserId();
		const title = toodoolDTO.getTitle();
		const description = toodoolDTO.getDescription();

		database.query(queryStrings.createToodoolQueryString, [title, description, userId]);
	}

	static async getToodoolsByUser(userId) {
		const result = await database.query(queryStrings.getToodolsByUserQueryString, [userId]);

		return result.rows;
	}

	static async getToodoolByUserAndId(userId, id) {
		const result = await database.query(queryStrings.getToodoolByUserAndIdQueryString, [userId, id]);

		if (!result.rows.length) {
			return null;
		}

		return result.rows[0];
	}

	static async getToodoolByUserAndTitle(userId, title) {
		const result = await database.query(queryStrings.selectToodoolByUserAndTitleQueryString, [userId, title]);

		if (!result.rows.length) {
			return undefined;
		}

		return result.rows[0];
	}

	static async updateToodol(toodoolDTO) {
		const id = toodoolDTO.getId();
		const completed = toodoolDTO.getCompleted();
		const title = toodoolDTO.getTitle();
		const description = toodoolDTO.getDescription();
		const userId = toodoolDTO.getUserId();

		database.query(queryStrings.updateToodoolQueryString, [completed, title, description, userId, id]);
	}

	static async completeToodool(toodoolDTO) {
		const id = toodoolDTO.getId();
		const completed = toodoolDTO.getCompleted();
		const userId = toodoolDTO.getUserId();

		database.query(queryStrings.completeToodoolQueryString, [completed, userId, id]);
	}

	static async deleteToodool(toodoolDTO) {
		const id = toodoolDTO.getId();
		const userId = toodoolDTO.getUserId();

		database.query(queryStrings.deleteToodoolQueryString, [id, userId]);
	}
}

module.exports = ToodoolServices;