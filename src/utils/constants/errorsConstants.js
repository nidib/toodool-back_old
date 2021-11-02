const errorTypes = {
	apiError: 'ApiError'
};

const errorMessages = {
	INVALID_LOGIN_INFO: 'Username/password is wrong',
	TOODOOL_ALREADY_EXISTS: 'You already have a toodool with this title',
	ROUTE_NOT_FOUND: 'Route not found',
	UNAUTHORIZED: 'Unauthorized',
	USER_ALREADY_EXISTS: 'Username already in use',
	VALIDATION_ERROR: 'The information provided does not meet the minimum requirements'
};

module.exports = {
	errorMessages,
	errorTypes
};