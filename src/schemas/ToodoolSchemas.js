const {
	boolean,
	oneCharText,
	oneCharTextOrNull,
	uuid
} = require('./_schemas');

const ID = 'id';
const USER_ID = 'userId';
const TITLE = 'title';
const DESCRIPTION = 'description';
const COMPLETED = 'completed';

const createToodoolSchema = {
	type: 'object',
	properties: {
		[USER_ID]: uuid,
		[TITLE]: oneCharText,
		[DESCRIPTION]: oneCharTextOrNull
	},
	required: [TITLE, USER_ID],
	allowedProperties: [TITLE, DESCRIPTION]
};

const updateToodoolSchema = {
	type: 'object',
	properties: {
		[ID]: uuid,
		[USER_ID]: uuid,
		[COMPLETED]: boolean,
		[TITLE]: oneCharText,
		[DESCRIPTION]: oneCharTextOrNull
	},
	required: [ID, USER_ID, COMPLETED, TITLE],
	allowedProperties: [TITLE, COMPLETED, DESCRIPTION]
};

const deleteToodoolSchema = {
	type: 'object',
	properties: {
		[ID]: uuid,
		[USER_ID]: uuid
	},
	required: [ID, USER_ID]
};

module.exports = {
	deleteToodoolSchema,
	createToodoolSchema,
	updateToodoolSchema
};