const { expect } = require('chai');
const Schema = require('../src/Schema');

describe('Schema.js', () => {
  describe('when a string has no options', () => {
    const Cat = new Schema({ name: { type: 'string' } });

    it('should be valid if value is present', () => {
      expect(Cat.validate({ name: 'Snarf' })).to.be.true;
    });

    it('should be valid if value is not present', () => {
      expect(Cat.validate({})).to.be.true;
    });
  });

  describe('when a string is required', () => {
    const Cat = new Schema({ name: { type: 'string', required: true } });

    it('should be valid if value is present', () => {
      expect(Cat.validate({ name: 'Missy' })).to.be.true;
    });

    it('should be invalid if value is not present', () => {
      expect(Cat.validate({})).to.be.false;
    });

    it('should be invalid if value is undefined', () => {
      expect(Cat.validate({ name: undefined })).to.be.false;
    });

    it('should be invalid if value is null', () => {
      expect(Cat.validate({ name: null })).to.be.false;
    });

    it('should be invalid if value is empty', () => {
      expect(Cat.validate({ name: '' })).to.be.false;
    });
  });

  describe('when a string has default value', () => {
    const Cat = new Schema({ name: { type: 'string', default: 'Kitty' } });

    it('should not modify when value is provided', () => {
      expect(Cat.defaults({ name: 'Garfield' })).to.deep.equal({ name: 'Garfield' });
    });

    it('should should use default when value is undefined', () => {
      expect(Cat.defaults({})).to.deep.equal({ name: 'Kitty' });
    });
  });
});
