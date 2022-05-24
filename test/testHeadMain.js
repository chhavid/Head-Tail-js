const assert = require('assert');
const { headMain, print, headAFile } =
  require('../src/headMain.js');

const readFile = (mockFiles, expEncoding) => {
  let index = 0;
  return function (files, encoding) {
    assert.equal(mockFiles[index].name, files);
    assert.equal(encoding, expEncoding);
    const fileContent = mockFiles[index].content;
    index++;
    return fileContent;
  };
};

const mockConsole = (expContent) => {
  let index = 0;
  return function (content) {
    assert.equal(expContent[index], content);
    index++;
  };
};

const mockFormatter = (content) => content;

describe('headMain', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt',
      content: 'hello'
    }], 'utf8');
    const mockedConsole = mockConsole(['hello']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole },
      '-n', '1', 'content.txt'), 0);
  });

  it('should give line of two files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' }], 'utf8');

    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole }, 'content.txt',
      'a.txt'), 0);
  });

  it('should give line of multiple files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' },
    { name: 'b.txt', content: 'hey' }], 'utf8');
    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n', '==> b.txt <==\nhey\n']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole }, 'content.txt',
      'a.txt', 'b.txt'), 0);
  });
  it('should give error if file is invalid', () => {
    const mockReadFileSync = readFile([], 'utf8');
    const mockedConsole = mockConsole(
      ['head: content.txt: No such file or directory']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole }, 'content.txt'), 1);
  });
});

describe('print', () => {
  it('should print the output', () => {
    const mockedConsole = mockConsole(['hello']);
    assert.strictEqual(print({ content: 'hello' }, {
      log: mockedConsole, error: mockedConsole
    }, mockFormatter), undefined);
  });
});

describe('headAFile', () => {
  it('should give result of head of file', () => {
    const mockReadFileSync = readFile([{
      name: 'a.txt',
      content: 'hello'
    }], 'utf8');
    assert.deepStrictEqual(headAFile('a.txt', mockReadFileSync, {
      name: 'lines', limit: 1
    }), { content: 'hello', file: 'a.txt' });
  });
  it('should have error in result if file not valid', () => {
    const mockReadFileSync = readFile([{}], 'utf8');
    assert.deepStrictEqual(headAFile('a.txt', mockReadFileSync, {
      name: 'lines', limit: 1
    }), {
      error: 'head: a.txt: No such file or directory',
      file: 'a.txt'
    });
  });
});

exports.mockConsole = mockConsole;
exports.readFile = readFile;
