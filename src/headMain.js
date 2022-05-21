const { parseArgs } = require('./parse.js');
const { getLines, sliceUpto } = require('./headLib.js');

const head = function (content, { count, bytes }) {
  return bytes ? sliceUpto(content, bytes) : getLines(content, count);
};

const headMain = function (readFile, ...args) {
  const { fileName, options } = parseArgs(args);
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${fileName}`,
      fileName,
    };
  }
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
