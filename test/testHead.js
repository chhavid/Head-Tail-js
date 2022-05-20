const assert = require('assert');
const { head } = require('../src/head.js');

describe('head', () => {
  it('should give the first single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });
});
