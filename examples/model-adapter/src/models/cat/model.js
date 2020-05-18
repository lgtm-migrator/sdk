const { Model } = require('../../../../../model/definition');
const schema = require('./schema');

class CatModel extends Model {
  constructor() {
    const indexes = [
      { name: 'byAge', keys: ['age'] },
      { name: 'byName', keys: ['name'] },
    ];

    const projections = [{ name: 'nameOnly', keys: ['name'] }];

    super('cat', { schema, indexes, projections });
  }
}

module.exports = CatModel;
