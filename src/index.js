require('./config/env');
const fs = require('fs');
const path = require('path');
const { db } = require('./config/database');
const logger = require('./config/logger');
const Server = require('./Server');

function handleMigrations() {
	const migrationsPath = 'migrations/tables.sql';
	const filePath = path.join(__dirname, migrationsPath);
	const data = fs.readFileSync(filePath, { encoding: 'utf8' });

	db.query(data.toString());
}

function handleError(err) {
	logger.info('❌ Error connecting/migrating to the database');
	logger.error(err.message);
}

const server = new Server(() => {
	db.connect()
		.then(() => {
			logger.info('✅ Connected to database');
			logger.info('=== Migrations started ===');
		})
		.then(handleMigrations)
		.then(() => {
			logger.info('=== Migrations finished ===');
			logger.info('✅ Everything good to go ✅');
		})
		.catch(handleError);
});

server.main();