const assert = require('assert');
const { parseArgs } = require('../src/parseTail.js');

describe('parseArgs :tail', () => {
  it('should parse only filename.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      files: ['a.txt'], options: {
        name: 'line', limit: 10,
        offsetBottom: false
      }
    });
  });

  it('should parse filename with count and space.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      files: ['a.txt'], options: { name: 'line', limit: 5, offsetBottom: false }
    });
  });

  it('should parse filename with bytes.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'a.txt']), {
      files: ['a.txt'], options: {
        name: 'byte', limit: 10,
        offsetBottom: false
      }
    });
  });
  it('should parse two filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: {
        name: 'line', limit: 10, offsetBottom: false
      }
    });
  });
  it('should parse more than one filename with option.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: {
        name: 'byte', limit: 10, offsetBottom: false
      }
    });
  });
  it('should override the limit if same option is given again.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', '-n3', 'a.txt']), {
      files: ['a.txt'], options: { name: 'line', limit: 3, offsetBottom: false }
    });
  });
  it('should parse file without options.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 10, offsetBottom: false
        }
      });
  });
  it('should parse file without space in option.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 2, offsetBottom: false
        }
      });
  });
  it('should parse if only number is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['-2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 2, offsetBottom: false
        }
      });
  });
  it('should parse if only number with plus is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['+2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 2, offsetBottom: true
        }
      });
  });
  it('should parse if option with plus number is given.', () => {
    assert.deepStrictEqual(parseArgs(['-n+5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 5, offsetBottom: true
        }
      });
  });
  it('should parse if option and plus number is given with space.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '+5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          name: 'line', limit: 5, offsetBottom: true
        }
      });
  });
});
