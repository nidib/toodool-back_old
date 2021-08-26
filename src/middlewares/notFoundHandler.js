const RouteNotFoundError = require('../errors/RouteNotFoundError');

function notFoundHandler(_req, _res, next) {
	return next(new RouteNotFoundError('Route not found'));
}

module.exports = notFoundHandler;