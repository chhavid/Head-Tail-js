const assert = require('assert');
const { tailMain, tailAFile } = require('../src/tailMain.js');
const { mockConsole, readFile } = require('./testHeadMain.js');

describe('tailMain', () => {
  it('should give line of single file', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt',
      content: 'hello'
    }], 'utf8');
    const mockedConsole = mockConsole(['hello']);
    assert.strictEqual(tailMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole },
      ['-n', '1', 'content.txt']), 0);
  });

  it('should give line of two files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' }], 'utf8');

    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n']);
    assert.strictEqual(tailMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole },
      ['content.txt', 'a.txt']), 0);
  });

  it('should give line of multiple files', () => {
    const mockReadFileSync = readFile([{
      name: 'content.txt', content: 'hello'
    }, { name: 'a.txt', content: 'bye' },
    { name: 'b.txt', content: 'hey' }], 'utf8');
    const mockedConsole = mockConsole(['==> content.txt <==\nhello\n',
      '==> a.txt <==\nbye\n', '==> b.txt <==\nhey\n']);
    assert.strictEqual(tailMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole },
      ['content.txt', 'a.txt', 'b.txt']), 0);
  });
  it('should give error if file is invalid', () => {
    const mockReadFileSync = readFile([], 'utf8');
    const mockedConsole = mockConsole(
      ['tail: content.txt: No such file or directory']);
    assert.strictEqual(tailMain(mockReadFileSync,
      { log: mockedConsole, error: mockedConsole }, ['content.txt']), 1);
  });
});

describe('TailAFile', () => {
  it('should give result of head of file', () => {
    const mockReadFileSync = readFile([{
      name: 'a.txt',
      content: 'bye\nhello'
    }], 'utf8');
    assert.deepStrictEqual(tailAFile('a.txt', mockReadFileSync, {
      name: 'lines', limit: 1
    }), { content: 'hello', file: 'a.txt' });
  });
  it('should have error in result if file not valid', () => {
    const mockReadFileSync = readFile([{}], 'utf8');
    assert.deepStrictEqual(tailAFile('a.txt', mockReadFileSync, {
      name: 'lines', limit: 1
    }), {
      error: 'tail: a.txt: No such file or directory',
      file: 'a.txt'
    });
  });
});
