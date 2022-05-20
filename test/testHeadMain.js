const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const readFile = (mockFile, expEncoding, content) => {
  return function (fileName, encoding) {
    assert.equal(mockFile, fileName);
    assert.equal(encoding, expEncoding);
    return content;
  };
};

describe('headMain', () => {
  it('should give single line of file', () => {
    const mockReadFileSync = readFile('content.txt', 'utf8', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, 'content.txt'), 'hello');
  });
});
