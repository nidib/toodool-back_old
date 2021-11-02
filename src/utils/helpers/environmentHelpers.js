function isTest() {
	return process.env.NODE_ENV === 'test';
}

function isProduction() {
	return process.env.NODE_ENV === 'production';
}

function isDev() {
	return process.env.NODE_ENV === 'dev';
}

module.exports = {
	isDev,
	isTest,
	isProduction
};