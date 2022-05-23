const { parseArgs } = require('./parse.js');
const { getLines, sliceUpto } = require('./headLib.js');
const { validateArgs } = require('./validate.js');

const head = function (content, { name, limit }) {
  return name === 'bytes'
    ? sliceUpto(content, limit) : getLines(content, limit);
};

const formatContent = function (content, file, numOfFiles) {
  const heading = '==>' + file + '<==' + '\n';
  return numOfFiles > 1 ? heading + content + '\n\n' : content;
};

const headFile = function (readFile, file, options, numOfFiles) {
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (error) {
    return `head: ${file}: No such file or directory\n`;
  }
  const fileContent = head(content, options);
  return formatContent(fileContent, file, numOfFiles);
};

const headMain = function (readFile, ...args) {
  let files, options;
  validateArgs(args);
  try {
    ({ files, options } = parseArgs(args));
  } catch (error) {
    return [error.message];
  }
  const numOfFiles = files.length;
  return files.map((file) => headFile(readFile, file, options, numOfFiles));
};

exports.head = head;
exports.headMain = headMain;
exports.headFile = headFile;
