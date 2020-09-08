const IdTypeNotSuported = require('./exceptions/IdTypeNotSupported');

class DynamoAdapter {
  /**
   * @param {AWS} options AWS instance to create document client
   */
  constructor(options) {
    this.options = options;
    this.options.dynamodb = { convertEmptyValues: true, ...options.dynamodb };
  }

  async setup() {
    if (this.dynamo) return;

    this.defineTables();

    const dynamo = new this.options.AWS.DynamoDB.DocumentClient(this.options.dynamodb);
    this.dynamo = dynamo;
  }

  async teardown() {
    this.dynamo = null;
  }

  defineTables() {
    this.tables = {};
    const { stringIdTable, numericIdTable } = this.options;
    if (stringIdTable) this.tables.string = stringIdTable;
    if (numericIdTable) this.tables.number = numericIdTable;
  }

  getTable(id) {
    const type = typeof id;
    if (!this.tables[type]) throw new IdTypeNotSuported(id, type);
    return this.tables[type];
  }

  async get(path, id) {
    await this.setup();
    const params = {
      TableName: this.getTable(id),
      Key: {
        path,
        id,
      },
    };
    return this.dynamo.get(params).promise();
  }

  async put(path, id, item) {
    await this.setup();
    const params = {
      TableName: this.getTable(id),
      Item: { path, id, data: item },
    };
    return this.dynamo.put(params).promise();
  }

  async delete(path, id) {
    await this.setup();
    const params = {
      TableName: this.getTable(id),
      Key: { path, id },
    };
    return this.dynamo.delete(params).promise();
  }
}

module.exports = DynamoAdapter;
