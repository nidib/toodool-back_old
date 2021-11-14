const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = {
	schemaValidator: ajv.compile.bind(ajv)
};