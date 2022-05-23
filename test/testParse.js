const assert = require('assert');
const { parseArgs, validateOptions, getOptions, getLimit, validateLimit } =
  require('../src/parse.js');

describe('parseArgs', () => {
  it('should parse only filename.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      files: ['a.txt'], options: { name: 'count', limit: 10 }
    });
  });

  it('should parse filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      files: ['a.txt'], options: { name: 'count', limit: 5 }
    });
  });

  it('should parse filename with bytes.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'a.txt']), {
      files: ['a.txt'], options: { name: 'bytes', limit: 10 }
    });
  });
  it('should parse two filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'count', limit: 10 }
    });
  });
  it('should parse multiple filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt', 'c.txt']), {
      files: ['b.txt', 'a.txt', 'c.txt'],
      options: { name: 'count', limit: 10 }
    });
  });
  it('should parse more than one filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'count', limit: 5 }
    });
  });
  it('should parse more than one filename with byte.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'bytes', limit: 10 }
    });
  });
  it('should override the limit if same option is given again.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', '-n3', 'a.txt']), {
      files: ['a.txt'], options: { name: 'count', limit: 3 }
    });
  });
  it('should parse file without options.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        files: ['a.txt'], options: { name: 'count', limit: 10 }
      });
  });
  it('should parse file without space in option.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', 'a.txt']),
      {
        files: ['a.txt'], options: { name: 'count', limit: 2 }
      });
  });
  it('should parse if only number is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['-2', 'a.txt']),
      {
        files: ['a.txt'], options: { name: 'count', limit: 2 }
      });
  });
});
describe('getOptions', () => {
  it('should give default option', () => {
    assert.deepStrictEqual(getOptions(''),
      { name: 'count', limit: 10 });
  });
  it('should give bytes option ', () => {
    assert.deepStrictEqual(getOptions('-c'),
      { name: 'bytes', limit: 10 });
  });
});
describe('getLimit', () => {
  it('should give specified limit with count option', () => {
    assert.strictEqual(getLimit('-n3'), 3);
  });
  it('should give specified limit with bytes option', () => {
    assert.strictEqual(getLimit('-c2'), 2);
  });
  it('should give direct specified limit ', () => {
    assert.strictEqual(getLimit('-2'), 2);
  });
});

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
describe('validateOptions', () => {
  it('should throw error if value is 0', () => {
    assert.throws(() => validateLimit(0),
      { message: 'head: illegal count -- 0' });
  });
});
