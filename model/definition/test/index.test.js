const { expect } = require('chai');
const { Model, Schema } = require('../src');

class CatModel extends Model {
  constructor() {
    const schema = new Schema({
      id: {
        type: 'number',
        required: true,
      },
      name: {
        type: 'string',
        default: 'unknown',
      },
      age: {
        type: 'number',
        default: 0,
      },
    });

    const indexes = [
      { name: 'byAge', keys: ['age'] },
      { name: 'byName', keys: ['name'] },
    ];

    const projections = [{ name: 'nameOnly', keys: ['name'] }];

    super('cat', { schema, indexes, projections });
  }
}

describe('index.js', () => {
  describe('when constructing a class with schema', () => {
    const Cat = new CatModel();
    const kitty = Cat.default();

    it('should have the property defined by the schema', () => {
      expect(kitty).to.deep.equal({ name: 'unknown', age: 0, id: undefined });
    });

    it('should not have the property "schema" exposed', () => {
      expect(kitty.schema).to.be.undefined;
    });
  });

  describe('when constructing a class with indexes', () => {
    const Cat = new CatModel();
    const kitty = { name: 'Kitty', id: 123, age: 7 };

    it('should return valid indexing instructions', () => {
      expect(Cat.getIndexes(kitty)).to.deep.equal([
        { path: 'byAge', id: 7, data: 123 },
        { path: 'byName', id: 'Kitty', data: 123 },
      ]);
    });
  });

  describe('when constructing a class with projections', () => {
    const Cat = new CatModel();
    const kitty = { name: 'Kitty', id: 123, age: 7 };

    it('should return valid projection instructions', () => {
      expect(Cat.getProjections(kitty)).to.deep.equal([
        { path: 'nameOnly', id: 123, data: { name: 'Kitty' } },
      ]);
    });
  });
});
