const { expect } = require('chai');
const Model = require('../src/Model');

class Cat extends Model {}

describe('Model.js', () => {
  describe('when a model is created', () => {
    it('should be able to construct', () => {
      const cat = new Cat();
      expect(cat).to.be.instanceOf(Object);
    });
  });
});
