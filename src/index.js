require('./config/env');
const db = require('./config/database');
const logger = require('./config/logger');
const Server = require('./Server');

const server = new Server(() => {
	db.query('SELECT NOW()')
		.then(() => {
			logger.info('✅ Connected to database');
		})
		.catch(err => {
			logger.error(err.message);
		});
});

server.main();