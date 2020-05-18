class Model {
  constructor(name, { schema, indexes, projections } = {}) {
    this.name = name;
    this.schema = schema;
    this.indexes = indexes;
    this.projections = projections;
  }

  useAdapter(adapter) {
    this.adapter = adapter;
  }

  default(bean = {}) {
    return this.schema.defaults(bean);
  }

  get(path, id) {
    return this.adapter.get(path, id);
  }

  put(path, id, item) {
    return this.adapter.put(path, id, item);
  }

  delete(path, id) {
    return this.adapter.delete(path, id);
  }

  getIndexes(item) {
    const indexList = this.indexes.map((index) => getIndex(index, item));
    return indexList.flat(1);
  }

  getProjections(item) {
    const projectionList = this.projections.map((index) => getProjection(index, item));
    return projectionList.flat(1);
  }
}

// TODO: organizar funções abaixo em outro arquivo
function getIndex(index, item) {
  const keys = [...index.keys];
  const lastKey = keys.pop();
  const path = [index.name, ...keys].join('-');
  const record = { path, id: item[lastKey], data: item.id };
  return [record];
}

function getProjection(projection, item) {
  const path = projection.name;
  const data = projection.keys.reduce((acc, key) => {
    acc[key] = item[key];
    return acc;
  }, {});
  const record = { path, id: item.id, data };
  return [record];
}

module.exports = Model;
