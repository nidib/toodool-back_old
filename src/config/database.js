const { Client, Pool } = require('pg');
const { isTest } = require('../utils/helpers/environmentHelpers');

function getDatabase() {
	if (isTest()) {
		return new Client({
			connectionString: process.env.DATABASE_URL_TEST
		});
	}

	return new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 15
	});
}

module.exports = getDatabase();