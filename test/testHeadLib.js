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
    assert.strictEqual(head('hello', { name: 'line', limit: 1 }), 'hello');
    assert.strictEqual(head('bye', { name: 'line', limit: 1 }), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld',
      { name: 'line', limit: 2 }), 'hello\nworld');
    assert.strictEqual(head('good\nbye',
      { name: 'line', limit: 2 }), 'good\nbye');
  });
  it('should give the content upto 10 lines', () => {
    assert.strictEqual(head('how\nare\nyou\n?', { name: 'line', limit: 4 }),
      'how\nare\nyou\n?');
  });
  it('should give only first 10 lines for content more than 10 lines',
    () => {
      assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl',
        { name: 'line', limit: 10 }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    });
  it('should give lines upto specified number', () => {
    assert.strictEqual(head('aa\nb\nhello', { name: 'line', limit: 2 }),
      'aa\nb');
    assert.strictEqual(head('aa\nb\nhello', { name: 'line', limit: 1 }),
      'aa');
  });
  it('should give lines upto specified bytes', () => {
    assert.strictEqual(head('aaa\nb\nhello', { name: 'byte', limit: 2 }),
      'aa');
    assert.strictEqual(head('aa\nb\nhello', { name: 'byte', limit: 6 }),
      'aa\nb\nh');
  });
});

