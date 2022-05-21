const assert = require('assert');
const { parseArgs } = require('../src/parse.js');

describe('parseArgs', () => {
  it('should parse only filename.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      fileName: ['a.txt'], options: { count: 10 }
    });
  });

  it('should parse filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      fileName: ['a.txt'], options: { count: 5 }
    });
  });

  it('should parse filename with bytes.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'a.txt']), {
      fileName: ['a.txt'], options: { bytes: 10 }
    });
  });
  it('should parse two filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt']), {
      fileName: ['b.txt', 'a.txt'], options: { count: 10 }
    });
  });
  it('should parse multiple filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt', 'c.txt']), {
      fileName: ['b.txt', 'a.txt', 'c.txt'], options: { count: 10 }
    });
  });
  it('should parse more than one filename with count.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'b.txt', 'a.txt']), {
      fileName: ['b.txt', 'a.txt'], options: { count: 5 }
    });
  });
  it('should parse more than one filename with byte.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'b.txt', 'a.txt']), {
      fileName: ['b.txt', 'a.txt'], options: { bytes: 10 }
    });
  });
});
