const { expect } = require('chai');
const AWS = require('aws-sdk');
const sinon = require('sinon');
const { CatModel } = require('../src');
const DynamoAdapter = require('../../../adapters/dynamodb/src/DynamoAdapter');

describe('index.js', () => {
  sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').callsArgWith({});

  describe('when a model is provided', async () => {
    const dynamo = new DynamoAdapter({ AWS, numericIdTable: 'test-numeric-id' });
    await dynamo.setup();
    const Cat = new CatModel();
    Cat.useAdapter(dynamo);
    const kitty = Cat.default();
    console.log(Cat);

    it('should be valid', () => {
      expect(Cat.schema.validate(kitty)).to.be.true;
    });

    it('should call get from adapter', async () => {
      const b = await Cat.get('aaa', 1);
      expect(b).to.be.true;
    });
  });
});
