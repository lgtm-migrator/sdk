class Schema {
  constructor(schema) {
    Object.assign(this, schema);
  }

  validate(value) {
    const validation = Object.entries(this).map(([name, schema]) => {
      return validate(schema, value[name]);
    });
    return validation.includes(false) ? false : true;
  }

  defaults(value) {
    const valueWithDefauls = { ...value };
    Object.entries(this).forEach(([name, schema]) => {
      valueWithDefauls[name] = defaults(schema, value[name]);
    });
    return valueWithDefauls;
  }
}

// TODO: move all these functions to another file
function defaults(schema, value) {
  if (value === undefined) return schema.default;
  return value;
}

function validate(schema, value) {
  if (schema.type === 'string') return validateString(schema, value);
}

function validateString(schema, value) {
  if (schema.required) return validateRequiredString(value);
}

function validateRequiredString(value) {
  if (value === undefined) return false;
  if (value === null) return false;
  if (value === '') return false;
  return true;
}

module.exports = Schema;
