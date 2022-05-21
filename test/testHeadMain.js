const assert = require('assert');
const { head, headMain, headFile } = require('../src/headMain.js');

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
    assert.strictEqual(head('aaa\nb\nhello', { bytes: 2 }),
      'aa');
    assert.strictEqual(head('aa\nb\nhello', { bytes: 6 }),
      'aa\nb\nh');
  });
});

const readFile = (mockFile, expEncoding, content) => {
  return function (fileName, encoding) {
    assert.equal(mockFile, fileName);
    assert.equal(encoding, expEncoding);
    return content;
  };
};

describe('headFile', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile('content.txt', 'utf8', 'hello');
    assert.deepStrictEqual(headFile(
      mockReadFileSync, 'content.txt', { count: 1 }), '\nhello');
  });
  it('should give multiple lines of single file', () => {
    const mockReadFileSync = readFile('content.txt', 'utf8', 'hello\nbye');
    assert.deepStrictEqual(headFile(
      mockReadFileSync, 'content.txt', { count: 2 }), '\nhello\nbye');
  });
});

describe('headMain', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile('content.txt', 'utf8', 'hello');
    assert.deepStrictEqual(headMain(mockReadFileSync, 'content.txt'),
      ['\nhello']);
  });
  it('should give line of multiple file', () => {
    const mockReadFileSync = readFile('content.txt', 'utf8', 'hello');
    assert.deepStrictEqual(headMain(mockReadFileSync, 'content.txt',
      'content.txt'), ['\nhello', '\nhello']);
  });
});
