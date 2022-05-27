const assert = require('assert');
const { headMain, print, headAFile } =
  require('../src/headMain.js');

const readFile = (mockFiles, expEncoding) => {
  let index = 0;
  return function (files, encoding) {
    assert.strictEqual(mockFiles[index].name, files);
    assert.strictEqual(encoding, expEncoding);
    const fileContent = mockFiles[index].content;
    index++;
    return fileContent;
  };
};

const mockConsole = (expContent) => {
  let index = 0;
  const display = (content) => {
    assert.strictEqual(expContent[index], content);
    index++;
    display.count++;
  };
  display.count = 0;
  return display;
};

const mockFormatter = (content) => content;

describe('headMain', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt',
      content: 'hello'
    }], 'utf8');
    const mockedConsole = mockConsole(['hello']);
    const mockedError = mockConsole(['error']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedError },
      ['-n', '1', 'content.txt']), 0);
  });

  it('should give line of two files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' }], 'utf8');

    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n']);
    const mockedError = mockConsole(['error']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedError },
      ['content.txt', 'a.txt']), 0);
  });

  it('should give line of multiple files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' },
    { name: 'b.txt', content: 'hey' }], 'utf8');
    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n', '==> b.txt <==\nhey\n']);
    const mockedError = mockConsole(['error']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedError },
      ['content.txt', 'a.txt', 'b.txt']), 0);
  });
  it('should give error if file is invalid', () => {
    const mockReadFileSync = readFile([], 'utf8');
    const mockedConsole = mockConsole(
      ['hello']);
    const mockedError = mockConsole(
      ['head: content.txt: No such file or directory']);
    assert.strictEqual(headMain(mockReadFileSync,
      { log: mockedConsole, error: mockedError }, ['content.txt']), 1);
  });
});

describe('print', () => {
  it('should print the output', () => {
    const mockedConsole = mockConsole(['hello']);
    const mockedError = mockConsole(['error']);
    assert.strictEqual(print({ content: 'hello' }, {
      log: mockedConsole, error: mockedError
    }, mockFormatter), undefined);
    assert.strictEqual(mockedConsole.count, 1);
  });

  it('should print the error', () => {
    const mockedConsole = mockConsole(['hello']);
    const mockedError = mockConsole(['Can not read file']);
    assert.strictEqual(print({ error: 'Can not read file' }, {
      log: mockedConsole, error: mockedError
    }, mockFormatter), undefined);
    assert.strictEqual(mockedError.count, 1);
  });
});

describe('headAFile', () => {
  it('should give result of head of file', () => {
    const mockReadFileSync = readFile([{
      name: 'a.txt',
      content: 'hello\nbye'
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
