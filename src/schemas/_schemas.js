const email = { type: ['string', 'null'], format: 'email' };
const boolean = { type: 'boolean' };
const oneCharText = { type: 'string', minLength: 1 };
const oneCharTextOrNull = { type: ['string', 'null'], minLength: 1 };
const uuid = { type: 'string', minLength: 32, maxLength: 32 };

module.exports = {
	boolean,
	email,
	oneCharText,
	oneCharTextOrNull,
	uuid
};