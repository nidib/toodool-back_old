function notFoundHandler(_req, _res, next) {
	return next(new Error('Not Found'));
}

module.exports = notFoundHandler;