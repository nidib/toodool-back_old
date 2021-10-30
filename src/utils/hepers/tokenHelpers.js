const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../../errors/UnauthorizedError');

function getToken(payload) {
	return jwt.sign(payload, process.env.JWT_KEY, process.env.JWT_DURATION);
}

function verifyToken(tokenCandidate) {
	try {
		return jwt.verify(tokenCandidate, process.env.JWT_KEY);
	} catch (_err) {
		throw new UnauthorizedError();
	}
}

module.exports = {
	getToken,
	verifyToken
};