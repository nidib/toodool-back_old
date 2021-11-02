const createUserSchema = {
	type: 'object',
	properties: {
		username: { type: 'string', minLength: 5 },
		password: { type: 'string', minLength: 10 }
	},
	required: ['username', 'password']
};

module.exports = {
	createUserSchema
};