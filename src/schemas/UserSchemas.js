const USERNAME = 'username';
const PASSWORD = 'password';

const createUserSchema = {
	type: 'object',
	properties: {
		[USERNAME]: { type: 'string', minLength: 5 },
		[PASSWORD]: { type: 'string', minLength: 10 }
	},
	required: [USERNAME, PASSWORD],
	allowedProperties: [USERNAME, PASSWORD]
};

const loginUserSchema = {
	type: 'object',
	properties: {
		[USERNAME]: { type: 'string', minLength: 5 },
		[PASSWORD]: { type: 'string', minLength: 10 }
	},
	required: [USERNAME, PASSWORD],
	allowedProperties: [USERNAME, PASSWORD]
};

module.exports = {
	createUserSchema,
	loginUserSchema
};