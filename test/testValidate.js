const assert = require('assert');
const { validateOptions, validateLimit, validateArgs } =
  require('../src/validate.js');

describe('validateOptions', () => {
  it('should throw error if invalid option is passed', () => {
    assert.throws(() => validateOptions({ name: 'lines', limit: 10 }, '-a'),
      { message: 'invalid option -a' });
  });
  it('should throw error if both options are passed', () => {
    assert.throws(() => validateOptions({ name: 'lines', limit: 10 }, '-c'),
      { message: 'can not combine line and byte counts' });
  });
  it('should return if option is direct value', () => {
    assert.strictEqual(validateOptions({ name: 'lines', limit: 10 }, '-2'), '');
  });
  it('should return if option is correct and same', () => {
    assert.strictEqual(validateOptions({ name: 'lines', limit: 10 }, '-n'),
      undefined);
  });
});

describe('validateLimit', () => {
  it('should throw error if value is 0', () => {
    assert.throws(() => validateLimit({ name: 'lines', limit: 0 }),
      { message: 'head: illegal lines count -- 0' });
  });
});

describe('validateArgs', () => {
  it('should throw error if args length is 0', () => {
    assert.throws(() => validateArgs([]),
      { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
});
