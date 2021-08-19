const App = require('./App');
const logger = require('./config/logger');

const DEFAULT_PORT = 4545;

class Server {
	constructor(onListen) {
		const { app } = new App();

		this.app = app;
		this.port = process.env.PORT || DEFAULT_PORT;
		this.onListen = onListen;

		this.handleListen = this.handleListen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.server.close();

		logger.info('👋🏽 App closed');
	}

	handleListen() {
		logger.info(`✅ Server started on port ${this.port}`);

		this.onListen && this.onListen();
	}

	main() {
		this.server = this.app.listen(this.port, this.handleListen);

		process.on('SIGINT', this.handleClose);
	}
}

module.exports = Server;