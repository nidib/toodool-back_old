const { Client, Pool } = require('pg');

function getDatabase() {
	if (process.env.NODE_ENV === 'test') {
		return new Client({
			connectionString: 'postgresql://admin:admin@localhost/toodooldb__test__'
		});
	}

	return new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 15
	});
}

const db = getDatabase();

module.exports = db;