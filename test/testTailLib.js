const assert = require('assert');
const { tail, getLines } = require('../src/tailLib.js');

describe('tail', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(tail('hello', { name: 'line', limit: 1 }), 'hello');
    assert.strictEqual(tail('bye', { name: 'line', limit: 1 }), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(tail('hello\nworld',
      { name: 'line', limit: 1 }), 'world');
    assert.strictEqual(tail('good\nbye',
      { name: 'line', limit: 1 }), 'bye');
  });
  it('should give lines upto the specified limit',
    () => {
      assert.strictEqual(tail('a\nb\nc\nd\ne\nf',
        { name: 'line', limit: 3 }), 'd\ne\nf');
    });
  it('should give lines upto specified bytes', () => {
    assert.strictEqual(tail('aaa\nb\nhello', { name: 'byte', limit: 2 }),
      'lo');
    assert.strictEqual(tail('aa\nb\nhello', { name: 'byte', limit: 6 }),
      '\nhello');
  });
});

describe('getLines', () => {
  it('should get single line.', () => {
    assert.strictEqual(getLines('a', 1), 'a');
  });
  it('should get 2 lines.', () => {
    assert.strictEqual(getLines('a\nb\nc', 2), 'b\nc');
  });
});

