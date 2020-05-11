const DynamoAdapter = require('./DynamoAdapter');

class DynamoAdapterLocal extends DynamoAdapter {
  constructor(options) {
    options.dynamodb = {
      convertEmptyValues: true,
      region: 'local-env',
      endpoint: 'http://localhost:8000',
      sslEnabled: false,
    };
    super(options);
  }
}

module.exports = DynamoAdapterLocal;
