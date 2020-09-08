const { assert, expect } = require('chai');
const { default: defaultAwesomeFunction, awesomeFunction } = require('../src');

describe('Awesome test.', () => {
  it('should test default awesome function', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Langa';
    assert(defaultAwesomeFunction('Langa') === expectedVal, 'Default not awesome :(');
  });

  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function';
    expect(awesomeFunction()).to.equal(expectedVal);
  });
});
