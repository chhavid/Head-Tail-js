const assert = require('assert');
const { head, firstLines } = require('../src/head.js');

describe('head', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('good\nbye'), 'good\nbye');
  });
  it('should give the content upto 10 lines', () => {
    assert.strictEqual(head('how\nare\nyou\n?'), 'how\nare\nyou\n?');
  });
  it('should give only first 10 lines for content more than 10 lines',
    () => {
      assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl'),
        'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
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
