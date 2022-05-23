const assert = require('assert');
const { parseArgs, validateOptions, getOptions, getLimit } =
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
    return assert.deepStrictEqual(getOptions(''),
      { name: 'count', limit: 10 });
  });
  it('should give bytes option ', () => {
    return assert.deepStrictEqual(getOptions('-c'),
      { name: 'bytes', limit: 10 });
  });
});
describe('getLimit', () => {
  it('should give specified limit with count option', () => {
    return assert.strictEqual(getLimit('-n3'), 3);
  });
  it('should give specified limit with bytes option', () => {
    return assert.strictEqual(getLimit('-c2'), 2);
  });
  it('should give direct specified limit ', () => {
    return assert.strictEqual(getLimit('-2'), 2);
  });
});
