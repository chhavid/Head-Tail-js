const assert = require('assert');
const { head } = require('../src/head.js');

describe('head', () => {
  it('should give the content of single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('should give the content with 2 lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('good\nbye'), 'good\nbye');
  });
});
