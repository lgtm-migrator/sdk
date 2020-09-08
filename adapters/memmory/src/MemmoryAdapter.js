class MemmoryAdapter {
  constructor(options = {}) {
    this.options = options;
    this.data = options.database;
    this.setup();
  }

  async setup() {
    if (!this.data) this.data = {};
  }

  async teardown() {
    this.data = null;
  }

  getPath(path) {
    if (!this.data[path]) this.data[path] = {};
    return this.data[path];
  }

  async get(path, id) {
    return this.getPath(path)[id];
  }

  async put(path, id, item) {
    this.getPath(path)[id] = item;
    return item;
  }

  async delete(path, id) {
    delete this.getPath(path)[id];
    return { path, id };
  }
}

module.exports = MemmoryAdapter;
