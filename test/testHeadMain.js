const assert = require('assert');
const { head, headMain, headFile } = require('../src/headMain.js');

describe('head', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(head('hello', { name: 'count', limit: 1 }), 'hello');
    assert.strictEqual(head('bye', { name: 'count', limit: 1 }), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld',
      { name: 'count', limit: 2 }), 'hello\nworld');
    assert.strictEqual(head('good\nbye',
      { name: 'count', limit: 2 }), 'good\nbye');
  });
  it('should give the content upto 10 lines', () => {
    assert.strictEqual(head('how\nare\nyou\n?', { name: 'count', limit: 4 }),
      'how\nare\nyou\n?');
  });
  it('should give only first 10 lines for content more than 10 lines',
    () => {
      assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl',
        { name: 'count', limit: 10 }), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    });
  it('should give lines upto specified number', () => {
    assert.strictEqual(head('aa\nb\nhello', { name: 'count', limit: 2 }),
      'aa\nb');
    assert.strictEqual(head('aa\nb\nhello', { name: 'count', limit: 1 }),
      'aa');
  });
  it('should give lines upto specified bytes', () => {
    assert.strictEqual(head('aaa\nb\nhello', { name: 'bytes', limit: 2 }),
      'aa');
    assert.strictEqual(head('aa\nb\nhello', { name: 'bytes', limit: 6 }),
      'aa\nb\nh');
  });
});

const readFile = (mockFile, expEncoding, content) => {
  let index = 0;
  return function (files, encoding) {
    assert.equal(mockFile[index], files);
    assert.equal(encoding, expEncoding);
    const fileContent = content[index];
    index++;
    return fileContent;
  };
};

describe('headFile', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile(['content.txt'], 'utf8', ['hello']);
    assert.deepStrictEqual(headFile(
      mockReadFileSync, 'content.txt', { count: 1 }), 'hello');
  });
  it('should give multiple lines of single file', () => {
    const mockReadFileSync = readFile(['content.txt'], 'utf8', ['hello\nbye']);
    assert.deepStrictEqual(headFile(
      mockReadFileSync, 'content.txt', { count: 2 }), 'hello\nbye');
  });
});

describe('headMain', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile(['content.txt'], 'utf8', ['hello']);
    assert.deepStrictEqual(headMain(mockReadFileSync, 'content.txt'),
      ['hello']);
  });
  it('should give line of two files', () => {
    const mockReadFileSync = readFile(['content.txt', 'a.txt'], 'utf8',
      ['hello', 'bye']);
    assert.deepStrictEqual(headMain(mockReadFileSync, 'content.txt',
      'a.txt'), ['hello', 'bye']);
  });
  it('should give line of multiple files', () => {
    const mockReadFileSync = readFile(['content.txt', 'a.txt', 'b.txt'], 'utf8',
      ['hello', 'bye', 'hey']);
    assert.deepStrictEqual(headMain(mockReadFileSync, 'content.txt',
      'a.txt', 'b.txt'), ['hello', 'bye', 'hey']);
  });
});
