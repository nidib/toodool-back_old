const RouteNotFoundError = require('../errors/RouteNotFoundError');

function notFoundHandler(req, _res, next) {
	return next(new RouteNotFoundError(req.originalUrl, req.method));
}

module.exports = notFoundHandler;