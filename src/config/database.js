const { Client, Pool } = require('pg');

function getDatabase() {
	if (process.env.NODE_ENV === 'test') {
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