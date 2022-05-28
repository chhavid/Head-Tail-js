const assert = require('assert');
const { parseArgs } = require('../src/parseTail.js');

describe('parseArgs :tail', () => {
  it('should parse only filename.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      files: ['a.txt'], options: {
        flag: '-n', limit: 10, reverse: false, format: true,
        offsetTop: false
      }
    });
  });

  it('should parse filename with count and space.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      files: ['a.txt'], options: {
        flag: '-n', limit: 5, reverse: false, format: true,
        offsetTop: false
      }
    });
  });

  it('should parse filename with bytes.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'a.txt']), {
      files: ['a.txt'], options: {
        flag: '-c', limit: 10, reverse: false, format: true,
        offsetTop: false
      }
    });
  });
  it('should parse two filenames.', () => {
    assert.deepStrictEqual(parseArgs(['b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: {
        flag: '-n', limit: 10, reverse: false, format: true,
        offsetTop: false
      }
    });
  });
  it('should parse more than one filename with option.', () => {
    assert.deepStrictEqual(parseArgs(['-c', '10', 'b.txt', 'a.txt']), {
      files: ['b.txt', 'a.txt'], options: {
        flag: '-c', limit: 10, reverse: false, format: true,
        offsetTop: false
      }
    });
  });
  // it('should override the limit if same option is given again.', () => {
  //   assert.deepStrictEqual(parseArgs(['-n2', '-n3', 'a.txt']), {
  //     files: ['a.txt'], options: {
  //       flag: '-n', limit: 10, reverse: false, format: true,
  //       offsetTop: false
  //     }
  //   });
  // });
  it('should parse file without options.', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 10, reverse: false, format: true,
          offsetTop: false
        }
      });
  });
  it('should parse file without space in option.', () => {
    assert.deepStrictEqual(parseArgs(['-n2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 2, reverse: false, format: true,
          offsetTop: false
        }
      });
  });
  it('should parse if only number is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['-2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 2, reverse: false, format: true,
          offsetTop: false
        }
      });
  });
  it('should parse if only number with plus is given as option.', () => {
    assert.deepStrictEqual(parseArgs(['+2', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 2, reverse: false, format: true,
          offsetTop: true
        }
      });
  });
  it('should parse if option with plus number is given.', () => {
    assert.deepStrictEqual(parseArgs(['-n+5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 5, reverse: false, format: true,
          offsetTop: true
        }
      });
  });
  it('should parse if option and plus number is given with space.', () => {
    assert.deepStrictEqual(parseArgs(['-n', '+5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 5, reverse: false, format: true,
          offsetTop: true
        }
      });
  });
  it('should parse if only -q option is given.', () => {
    assert.deepStrictEqual(parseArgs(['-q', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 10, reverse: false, format: false,
          offsetTop: false
        }
      });
  });
  it('should parse if only -r option is given.', () => {
    assert.deepStrictEqual(parseArgs(['-r', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 10, reverse: true, format: true,
          offsetTop: false
        }
      });
  });
  it('should parse if only -q is given with another option .', () => {
    assert.deepStrictEqual(parseArgs(['-q', '-c', '5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-c', limit: 5, reverse: false, format: false,
          offsetTop: false
        }
      });
  });
  it('should parse if only -r is given with another option .', () => {
    assert.deepStrictEqual(parseArgs(['-r', '-n', '5', 'a.txt']),
      {
        files: ['a.txt'], options: {
          flag: '-n', limit: 5, reverse: true, format: true,
          offsetTop: false
        }
      });
  });
});
