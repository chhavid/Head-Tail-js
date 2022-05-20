const { parseArgs } = require('./parse.js');

const NEWLINE = '\n';
const startIndex = 0;

const splitContent = (content) => content.split(NEWLINE);

const joinLines = (lines) => lines.join(NEWLINE);

const firstLines = (content, count) => {
  return content.slice(startIndex, count);
};

const giveLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = firstLines(lines, count);
  return joinLines(headLines);
};

const giveBytes = function (content, bytes) {
  return content.slice(startIndex, bytes);
};

const head = function (content, { count, bytes }) {
  return bytes ? giveBytes(content, bytes) : giveLines(content, count);
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

exports.headMain = headMain;
exports.head = head;
exports.firstLines = firstLines;
exports.giveLines = giveLines;
exports.giveBytes = giveBytes;
