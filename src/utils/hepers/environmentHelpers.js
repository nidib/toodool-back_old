function isTest() {
	return process.env.NODE_ENV === 'test';
}

function isProduction() {
	return process.env.NODE_ENV === 'production';
}

module.exports = {
	isTest,
	isProduction
};