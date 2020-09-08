const { expect } = require('chai');
const MemmoryAdapter = require('../src/index').default;

const database = {};

describe('index.js', () => {
  describe('when default instance is created', () => {
    const adapter = new MemmoryAdapter({ database });

    it('should be able to setup', async () => {
      expect(await adapter.setup()).not.to.throw;
    });

    it('should be able to teardown', async () => {
      expect(await adapter.teardown()).not.to.throw;
    });

    it('should have a function "get"', () => {
      expect(adapter.get).to.be.instanceOf(Function);
    });

    it('should have a function "put"', () => {
      expect(adapter.put).to.be.instanceOf(Function);
    });

    it('should have a function "delete"', () => {
      expect(adapter.delete).to.be.instanceOf(Function);
    });
  });

  describe('when local instance is created', () => {
    const adapter = new MemmoryAdapter({ database });

    it('should have the property "options"', () => {
      expect(adapter.options).to.exist;
    });

    it('should be able to setup', async () => {
      expect(await adapter.setup()).not.to.throw;
    });

    it('should be able to teardown', async () => {
      expect(await adapter.teardown()).not.to.throw;
    });

    it('should have a function "get"', () => {
      expect(adapter.get).to.be.instanceOf(Function);
    });

    it('should have a function "put"', () => {
      expect(adapter.put).to.be.instanceOf(Function);
    });

    it('should have a function "delete"', () => {
      expect(adapter.delete).to.be.instanceOf(Function);
    });
  });

  describe('when put is called', () => {
    const adapter = new MemmoryAdapter({ database });

    it('should succeed', async () => {
      const item = await adapter.put('/', 123, { yes: true });
      expect(item).to.exist;
    });
  });

  describe('when get is called', () => {
    const adapter = new MemmoryAdapter({ database });

    it('should succeed', async () => {
      const item = await adapter.get('/', '123');
      expect(item).to.exist;
    });
  });

  describe('when delete is called', () => {
    const adapter = new MemmoryAdapter({ data });

    it('should succeed', async () => {
      const item = await adapter.delete('/', 123);
      expect(item).to.deep.equal({ path: '/', id: 123 });
    });
  });
});
