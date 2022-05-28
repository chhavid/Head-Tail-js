const assert = require('assert');
const { firstNLines, firstNBytes, sliceUpto, head } =
  require('../src/headLib.js');

describe('firstNLines', () => {
  it('should get single line.', () => {
    return assert.strictEqual(firstNLines('a', 1), 'a');
  });
  it('should get 2 lines.', () => {
    return assert.strictEqual(firstNLines('a\nb\nc', 2), 'a\nb');
  });
});

describe('firstNBytes', () => {
  it('should get single byte.', () => {
    return assert.strictEqual(firstNBytes('ab', 1), 'a');
  });
  it('should get 2 bytes.', () => {
    return assert.strictEqual(firstNBytes('ab', 2), 'ab');
  });
  it('should also consider newline character', () => {
    return assert.strictEqual(firstNBytes('a\nbc', 3), 'a\nb');
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

describe('head', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(head('hello', { limit: 1 }, firstNLines), 'hello');
    assert.strictEqual(head('bye', { limit: 1 }, firstNLines), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld',
      { limit: 2 }, firstNLines), 'hello\nworld');
    assert.strictEqual(head('good\nbye',
      { limit: 2 }, firstNLines), 'good\nbye');
  });
  it('should give the content upto 10 lines', () => {
    assert.strictEqual(head('how\nare\nyou\n?', { limit: 4 }, firstNLines),
      'how\nare\nyou\n?');
  });
  it('should give only first 10 lines for content more than 10 lines',
    () => {
      assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl',
        { limit: 10 }, firstNLines), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    });
  it('should give lines upto specified number', () => {
    assert.strictEqual(head('aa\nb\nhello', { limit: 2 }, firstNLines),
      'aa\nb');
    assert.strictEqual(head('aa\nb\nhello', { limit: 1 }, firstNLines),
      'aa');
  });
  it('should give lines upto specified bytes', () => {
    assert.strictEqual(head('aaa\nb\nhello', { limit: 2 }, firstNBytes),
      'aa');
    assert.strictEqual(head('aa\nb\nhello', { limit: 6 }, firstNBytes),
      'aa\nb\nh');
  });
});

