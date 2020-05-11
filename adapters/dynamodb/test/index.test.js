const { expect } = require('chai');
const AWS_MOCK = require('aws-sdk-mock');
const AWS = require('../src/externals/aws-sdk');
const DynamoAdapter = require('../src/index').default;
const DynamoAdapterLocal = require('../src/index').Local;

describe('index.js', () => {
  AWS_MOCK.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
    callback(null, 'successfully put item in database');
  });

  AWS_MOCK.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
    callback(null, 'successfully put item in database');
  });

  AWS_MOCK.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
    callback(null, params.Key);
  });

  after(() => {
    // restore normal function
    AWS_MOCK.restore('DynamoDB.DocumentClient');
  });

  describe('when default instance is created', () => {
    const adapter = new DynamoAdapter({ AWS, numericIdTable: 'testTable' });

    it('should have the property "dynamo"', () => {
      expect(adapter.dynamo).to.exist;
    });
  });

  describe('when local instance is created', () => {
    const adapter = new DynamoAdapterLocal({ AWS, numericIdTable: 'testTable' });

    it('should have the property "dynamo"', () => {
      expect(adapter.dynamo).to.exist;
    });

    it('should have a function "get"', () => {
      expect(adapter.get).to.be.instanceOf(Function);
    });

    it('should have a function "put"', () => {
      expect(adapter.put).to.be.instanceOf(Function);
    });
  });

  describe('when put is called', () => {
    const adapter = new DynamoAdapterLocal({ AWS, numericIdTable: 'testTable' });

    it('should succeed when item is valid', async () => {
      const item = await adapter.put('/', 123, { yes: true });
      expect(item).to.exist;
    });

    it('should throw an error when unsupported id type is provided', async () => {
      try {
        const item = await adapter.put('/', '123', { yes: true });
        expect(item).to.be.undefined;
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).to.eql('Id (123) typed as string is not supported by this adapter!');
      }
    });
  });

  describe('when get is called', () => {
    const adapter = new DynamoAdapterLocal({ AWS, numericIdTable: 'testTable' });

    it('should succeed', async () => {
      const item = await adapter.get('/', 123);
      expect(item).to.exist;
    });
  });

  describe('when delete is called', () => {
    const adapter = new DynamoAdapterLocal({ AWS, numericIdTable: 'testTable' });

    it('should succeed', async () => {
      const item = await adapter.delete('/', 123);
      expect(item).to.deep.equal({ path: '/', id: 123 });
    });
  });
});
