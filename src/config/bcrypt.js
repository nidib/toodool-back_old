const { hash, compare } = require('bcrypt');
const { saltRounds } = require('../utils/constants/bcryptConstants');

async function hashPassword(plainPassword) {
	return hash(plainPassword, saltRounds);
}

async function comparePassword(candidate, actual) {
	return compare(candidate, actual);
}

module.exports = {
	comparePassword,
	hashPassword
};