const assert = require('assert');
const { getLines, sliceUpto } = require('../src/headLib.js');

describe('getLines', () => {
  it('should get single line.', () => {
    return assert.strictEqual(getLines('a', 1), 'a');
  });
  it('should get 2 lines.', () => {
    return assert.strictEqual(getLines('a\nb\nc', 2), 'a\nb');
  });
});

describe('sliceUpto', () => {
  it('should get single byte.', () => {
    return assert.strictEqual(sliceUpto('a', 1), 'a');
  });
  it('should get 5 bytes.', () => {
    return assert.strictEqual(sliceUpto('abc\nde', 5), 'abc\nd');
  });
  it('Should get only one line of array', () => {
    return assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 1), ['hello']);
  });
  it('Should get two lines', () => {
    return assert.deepStrictEqual(sliceUpto(['hello', 'bye'], 2),
      ['hello', 'bye']);
  });
});
