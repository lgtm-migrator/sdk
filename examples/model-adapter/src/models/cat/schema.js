const { Schema } = require('../../../../../model/definition');

const CatSchema = new Schema({
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

module.exports = CatSchema;
