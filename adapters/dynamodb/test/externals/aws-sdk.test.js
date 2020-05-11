const { expect } = require('chai');
const AWS = require('../../src/externals/aws-sdk');

describe('/externals/aws-sdk.js', () => {
  describe('when default export is imported', () => {
    it('should have a variable called aws', () => {
      expect(AWS).to.exist;
    });

    describe('when Dynamodb is required', () => {
      it('should have function AWS.DynamoDB.DocumentClient', () => {
        expect(AWS.DynamoDB.DocumentClient).to.be.instanceOf(Function);
      });

      it('should accept and use arguments', () => {
        const options = { convertEmptyValues: true };
        const dynamodb = new AWS.DynamoDB.DocumentClient({ ...options });
        expect(dynamodb.service.config).to.contain(options);
      });
    });
  });
});
