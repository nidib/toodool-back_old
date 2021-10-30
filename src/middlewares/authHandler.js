const { verifyToken } = require('../utils/hepers/tokenHelpers');

function authHandler(req, _res, next) {
	let cookie, decodedToken;

	try {
		cookie = req.cookies['toodool-auth'];
		decodedToken = verifyToken(cookie);
		req.userId = decodedToken.key;
	} catch (err) {
		return next(err);
	}

	return next();
}

module.exports = {
	authHandler
};