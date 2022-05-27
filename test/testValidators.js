const assert = require('assert');
const { validateOptions, validateLimit, validateFiles,
  isOption, validateCombinations, isOptionValid } =
  require('../src/validators.js');

describe('validateOptions', () => {
  it('should throw error if invalid option is passed', () => {
    assert.throws(() => validateOptions({ name: 'line', limit: 10 }, '-a'),
      {
        message: 'head: invalid option -- a\n'
          + 'usage: head [-n lines | -c bytes] [file ...]'
      });
  });
  it('should return if option is direct value', () => {
    assert.strictEqual(validateOptions({ name: 'line', limit: 10 }, '-2'),
      undefined);
  });
  it('should return if option is correct and same', () => {
    assert.strictEqual(validateOptions({ name: 'line', limit: 10 }, '-n'),
      undefined);
  });
});

describe('validateLimit', () => {
  it('should throw error if limit is 0', () => {
    assert.throws(() => validateLimit({ name: 'line', limit: 0 }),
      { message: 'head: illegal line count -- 0' });
  });
  it('should throw error if limit is non-numeric', () => {
    assert.throws(() => validateLimit({ name: 'line', limit: 'e' }),
      { message: 'head: illegal line count -- e' });
  });
  it('should not throw error if limit is valid', () => {
    assert.strictEqual(validateLimit({ name: 'line', limit: '5' }),
      undefined);
  });
});

describe('validateFiles :Head', () => {
  it('should throw error if args length is 0', () => {
    const message = 'usage: head [-n lines | -c bytes] [file ...]';
    assert.throws(() => validateFiles([]), { message });
  });
  it('should not throw error if args length is greater than 0', () => {
    assert.strictEqual(validateFiles(['hello']), undefined);
  });
});

describe('isOption', () => {
  it('should return true if given a option.', () => {
    assert.strictEqual(isOption('-n'), true);
  });
  it('should return false if something not starting with - is given', () => {
    assert.strictEqual(isOption('n'), false);
  });
});

describe('validateCombinations', () => {
  it('should throw error if different options are combined', () => {
    assert.throws(() => validateCombinations(['-n', '1', '-c', '2']),
      {
        message: 'head: can\'t combine line and byte counts'
      });
  });
  it('should not throw error if same option is given twice', () => {
    assert.strictEqual(validateCombinations(['-n', '1', '-n', '2']), undefined);
  });
});

describe('isOptionValid', () => {
  it('should return name if option is valid', () => {
    assert.strictEqual(isOptionValid('-n', {
      '-n': 'line', '-c': 'byte'
    }), 'line');
  });
  it('should return false if same options are given', () => {
    assert.strictEqual(isOptionValid('-a', {
      '-n': 'line', '-c': 'byte'
    }), false);
  });
});
