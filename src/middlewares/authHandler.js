const { verifyToken } = require('../utils/helpers/tokenHelpers');

function authHandler(req, _res, next) {
	let cookie, decodedToken;

	try {
		cookie = req.cookies['toodool-auth'];
		decodedToken = verifyToken(cookie);
		req.userId = decodedToken.who;
	} catch (err) {
		return next(err);
	}

	return next();
}

module.exports = {
	authHandler
};