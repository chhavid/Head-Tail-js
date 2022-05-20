const assert = require('assert');
const { head, firstLines, giveBytes, giveLines } = require('../src/headLib.js');

describe('head', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(head('hello', { count: 1 }), 'hello');
    assert.strictEqual(head('bye', { count: 1 }), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld', { count: 2 }), 'hello\nworld');
    assert.strictEqual(head('good\nbye', { count: 2 }), 'good\nbye');
  });
  it('should give the content upto 10 lines', () => {
    assert.strictEqual(head('how\nare\nyou\n?', { count: 4 }),
      'how\nare\nyou\n?');
  });
  it('should give only first 10 lines for content more than 10 lines',
    () => {
      assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl',
        { count: 10 }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    });
  it('should give lines upto specified number', () => {
    assert.strictEqual(head('aa\nb\nhello', { count: 2 }),
      'aa\nb');
    assert.strictEqual(head('aa\nb\nhello', { count: 1 }),
      'aa');
  });
  it('should give lines upto specified bytes', () => {
    assert.strictEqual(head('aaa\nb\nhello', { byte: 2 }),
      'aa');
    assert.strictEqual(head('aa\nb\nhello', { byte: 6 }),
      'aa\nb\nh');
  });
});

describe('firstLines', () => {
  it('Should give one line', () => {
    return assert.deepStrictEqual(firstLines(['hello'], 1), ['hello']);
  });
  it('Should give two lines', () => {
    return assert.deepStrictEqual(firstLines(['hello', 'bye'], 2),
      ['hello', 'bye']);
  });
  it('Should give only one line', () => {
    return assert.deepStrictEqual(firstLines(['good', 'bye'], 1),
      ['good']);
  });
});

describe('giveLines', () => {
  it('should give single line.', () => {
    return assert.strictEqual(giveLines('a', 1), 'a');
  });
  it('should give 2 lines.', () => {
    return assert.strictEqual(giveLines('a\nb\nc', 2), 'a\nb');
  });
});

describe('giveBytes', () => {
  it('should give single byte.', () => {
    return assert.strictEqual(giveBytes('a', 1), 'a');
  });
  it('should give 5 bytes.', () => {
    return assert.strictEqual(giveBytes('abc\nde', 5), 'abc\nd');
  });
});
