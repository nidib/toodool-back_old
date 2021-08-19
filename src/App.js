const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const routes = require('./routes/routes');

class App {
	constructor() {
		this.app = express();

		this.main();
	}

	earlyMiddlewares() {
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());

		logger.info('✅ Loaded early middlewares');
	}

	lateMiddlewares() {
		this.app.use(notFoundHandler);
		this.app.use(errorHandler);

		logger.info('✅ Loaded late middlewares');
	}

	setRoutes() {
		this.app.use(routes);
	}

	main() {
		this.earlyMiddlewares();
		this.setRoutes();
		this.lateMiddlewares();
	}
}

module.exports = App;