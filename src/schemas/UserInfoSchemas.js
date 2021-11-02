const updateUserInfoSchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' },
		firstName: { type: 'string', minLength: 3 },
		lastName: { type: 'string', minLength: 1 },
		nickname: { type: 'string', minLength: 3 }
	}
};

module.exports = {
	updateUserInfoSchema
};