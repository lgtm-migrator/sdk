const IdTypeNotSuported = require('./exceptions/IdTypeNotSupported');

class DynamoAdapter {
  constructor(options) {
    options.dynamodb = { convertEmptyValues: true };
    this.initialize(options);
  }

  initialize(options) {
    this.setTable('string', options.stringIdTable);
    this.setTable('number', options.numericIdTable);

    const dynamo = new options.AWS.DynamoDB.DocumentClient(options.dynamodb);
    this.dynamo = dynamo;
  }

  setTable(type, tableName) {
    if (!this.tables) this.tables = {};
    this.tables[type] = tableName;
  }

  getTable(id) {
    const type = typeof id;
    if (this.tables && this.tables[type]) {
      return this.tables[type];
    } else {
      throw new IdTypeNotSuported(id, type);
    }
  }

  async get(path, id) {
    const tableName = this.getTable(id);
    const params = {
      TableName: tableName,
      Key: {
        path,
        id,
      },
    };
    return this.dynamo.get(params).promise();
  }

  async put(path, id, item) {
    const tableName = this.getTable(id);
    const params = {
      TableName: tableName,
      Item: { path, id, data: item },
    };
    return this.dynamo.put(params).promise();
  }

  async delete(path, id) {
    const tableName = this.getTable(id);
    const params = {
      TableName: tableName,
      Key: { path, id },
    };
    return this.dynamo.delete(params).promise();
  }
}

module.exports = DynamoAdapter;
