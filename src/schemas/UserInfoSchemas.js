const { email } = require('./_schemas');

const EMAIL = 'email';
const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';
const NICKNAME = 'nickname';

const updateUserInfoSchema = {
	type: 'object',
	properties: {
		[EMAIL]: email,
		[FIRST_NAME]: { type: ['string', 'null'], minLength: 3 },
		[LAST_NAME]: { type: ['string', 'null'], minLength: 1 },
		[NICKNAME]: { type: ['string', 'null'], minLength: 3 }
	},
	allowedProperties: [EMAIL, FIRST_NAME, LAST_NAME, NICKNAME]
};

module.exports = {
	updateUserInfoSchema
};