const createToodoolSchema = {
	type: 'object',
	properties: {
		title: { type: 'string', minLength: 1 },
		description: { type: 'string', minLength: 1 }
	},
	required: ['title']
};

const updateToodoolSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
		completed: { type: 'boolean' },
		title: { type: 'string', minLength: 1 },
		description: { type: 'string', minLength: 1 }
	},
	required: ['completed', 'title']
};

const completeToodoolSchema = {
	type: 'object',
	properties: {
		completed: { type: 'boolean' }
	},
	required: ['completed']
};

module.exports = {
	completeToodoolSchema,
	createToodoolSchema,
	updateToodoolSchema
};