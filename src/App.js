const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const routes = require('./routes/routes');
const { corsOptions } = require('./utils/constants/corsConstants');

class App {
	constructor() {
		this.app = express();

		this.main();
	}

	earlyMiddlewares() {
		this.app.use(cors(corsOptions));
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cookieParser());
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

		logger.info('✅ Loaded routes');
	}

	main() {
		this.earlyMiddlewares();
		this.setRoutes();
		this.lateMiddlewares();
	}
}

module.exports = App;