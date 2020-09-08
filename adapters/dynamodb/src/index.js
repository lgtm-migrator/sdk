const DynamoAdapter = require('./DynamoAdapter');
const DynamoAdapterLocal = require('./DynamoAdapterLocal');

module.exports = { default: DynamoAdapter, Local: DynamoAdapterLocal };
