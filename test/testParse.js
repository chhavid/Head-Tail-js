const assert = require('assert');
const { parseArgs, getOptions, formatArgs } = require('../src/parse.js');

describe('parseArgs', () => {
  it('should parse only filename.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      files: ['a.txt'], options: { name: 'line', limit: 10 }
    });
  });

  it('should parse filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      files: ['a.txt'], options: { name: 'line', limit: 5 }
    });
  });

  it('should parse filename with bytes.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'a.txt']), {
      files: ['a.txt'], options: { name: 'byte', limit: 10 }
    });
  });
  it('should parse two filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'line', limit: 10 }
    });
  });
  it('should parse multiple filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt', 'c.txt']), {
      files: ['b.txt', 'a.txt', 'c.txt'],
      options: { name: 'line', limit: 10 }
    });
  });
  it('should parse more than one filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'line', limit: 5 }
    });
  });
  it('should parse more than one filename with byte.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: { name: 'byte', limit: 10 }
    });
  });
  it('should override the limit if same option is given again.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', '-n3', 'a.txt']), {
      files: ['a.txt'], options: { name: 'line', limit: 3 }
    });
  });
  it('should parse file without options.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        files: ['a.txt'], options: { name: 'line', limit: 10 }
      });
  });
  it('should parse file without space in option.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', 'a.txt']),
      {
        files: ['a.txt'], options: { name: 'line', limit: 2 }
      });
  });
  it('should parse if only number is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['-2', 'a.txt']),
      {
        files: ['a.txt'], options: { name: 'line', limit: 2 }
      });
  });
  it('should parse throw given error if file is not present', () => {
    assert.throws(() =>
      parseArgs(['-n2'], 'file not present'), {
      message: 'file not present'
    });
  });
});

describe('getOptions', () => {
  it('should give default option', () => {
    assert.deepStrictEqual(getOptions(''),
      { name: 'line', limit: 10 });
  });
  it('should give bytes option ', () => {
    assert.deepStrictEqual(getOptions('-c'),
      { name: 'byte', limit: 10 });
  });
});

describe('formatArgs', () => {
  it('should give option without value', () => {
    assert.deepStrictEqual(formatArgs('-n'), ['-n', '']);
  });
  it('should give option with value', () => {
    assert.deepStrictEqual(formatArgs('-n2'), ['-n', '2']);
  });
  it('should give direct value', () => {
    assert.deepStrictEqual(formatArgs('-4'), ['-n', '4']);
  });
});
