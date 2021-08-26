const ROUTE_NOT_FOUND = 'RouteNotFoundError';
const UNKNOWN = 'UnknownError';

module.exports = [{
	name: UNKNOWN,
	message: 'Something went wrong',
	statusCode: 500
}, {
	name: ROUTE_NOT_FOUND,
	statusCode: 404
}];