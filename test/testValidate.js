const assert = require('assert');
const { validateOptions, validateLimit } = require('../src/validate.js');

describe('validateOptions', () => {
  it('should throw error if invalid option is passed', () => {
    assert.throws(() => validateOptions({ name: 'count', limit: 10 }, '-a'),
      { message: 'invalid option -a' });
  });
  it('should throw error if both options are passed', () => {
    assert.throws(() => validateOptions({ name: 'count', limit: 10 }, '-c'),
      { message: 'can not combine line and byte counts' });
  });
  it('should return if option is direct value', () => {
    assert.strictEqual(validateOptions({ name: 'count', limit: 10 }, '-2'), '');
  });
  it('should return if option is correct and same', () => {
    assert.strictEqual(validateOptions({ name: 'count', limit: 10 }, '-n'),
      undefined);
  });
});

describe('validateLimit', () => {
  it('should throw error if value is 0', () => {
    assert.throws(() => validateLimit(0),
      { message: 'head: illegal count -- 0' });
  });
});
