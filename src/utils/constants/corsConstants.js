const { isDev } = require('../helpers/environmentHelpers');

const corsOptions = {
	credentials: true,
	origin: isDev() ? 'http://127.0.0.1:5500' : '*'
};

module.exports = {
	corsOptions
};