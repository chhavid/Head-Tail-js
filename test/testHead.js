const assert = require('assert');
const { firstLines, getBytes, getLines } = require('../src/headLib.js');

describe('firstLines', () => {
  it('Should get one line', () => {
    return assert.deepStrictEqual(firstLines(['hello'], 1), ['hello']);
  });
  it('Should get two lines', () => {
    return assert.deepStrictEqual(firstLines(['hello', 'bye'], 2),
      ['hello', 'bye']);
  });
  it('Should get only one line', () => {
    return assert.deepStrictEqual(firstLines(['good', 'bye'], 1),
      ['good']);
  });
});

describe('getLines', () => {
  it('should get single line.', () => {
    return assert.strictEqual(getLines('a', 1), 'a');
  });
  it('should get 2 lines.', () => {
    return assert.strictEqual(getLines('a\nb\nc', 2), 'a\nb');
  });
});

describe('getBytes', () => {
  it('should get single byte.', () => {
    return assert.strictEqual(getBytes('a', 1), 'a');
  });
  it('should get 5 bytes.', () => {
    return assert.strictEqual(getBytes('abc\nde', 5), 'abc\nd');
  });
});
