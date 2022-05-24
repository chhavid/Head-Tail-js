const { parseArgs } = require('./parse.js');
const { getLines, sliceUpto } = require('./headLib.js');
const { validateArgs } = require('./validate.js');

const head = function (content, { name, limit }) {
  return name === 'byte'
    ? sliceUpto(content, limit) : getLines(content, limit);
};

const formatContent = function (content, file, numOfFiles) {
  const heading = '==> ' + file + ' <==' + '\n';
  return numOfFiles > 1 ? heading + content + '\n' : content;
};

const headMain = function (readFile, { log, error }, ...args) {
  validateArgs(args);
  const { files, options } = parseArgs(args);
  let exitCode = 0;
  files.forEach((file) => {
    try {
      const content = head(readFile(file, 'utf8'), options);
      log(formatContent(content, file, files.length));
    } catch (err) {
      exitCode = 1;
      error('head: ' + file + ': No such file or directory');
    }
  });
  return exitCode;
};

exports.head = head;
exports.headMain = headMain;
exports.formatContent = formatContent;
