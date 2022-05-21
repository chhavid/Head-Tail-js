const { parseArgs } = require('./parse.js');
const { getLines, sliceUpto } = require('./headLib.js');

const head = function (content, { count, bytes }) {
  return isFinite(bytes) ? sliceUpto(content, bytes) : getLines(content, count);
};

const headFile = function (readFile, file, options) {
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${file}`,
      file,
    };
  }
  return `${head(content, options)}`;
};

const headMain = function (readFile, ...args) {
  const { fileName, options } = parseArgs(args);
  return fileName.map((file) => headFile(readFile, file, options));
};

exports.head = head;
exports.headMain = headMain;
exports.headFile = headFile;
