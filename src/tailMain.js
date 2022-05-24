const { formatContent } = require('./headMain.js');
const { tail } = require('./tailLib.js');
const { parseArgs } = require('./parse.js');

const tailMain = function (readFile, { log, error }, ...args) {
  const { files, options } = parseArgs(args);
  let exitCode = 0;
  files.forEach((file) => {
    try {
      const content = tail(readFile(file, 'utf8'), options);
      log(formatContent(content, file, files.length));
    } catch (err) {
      exitCode = 1;
      error('tail: ' + file + ': No such file or directory');
    }
  });
  return exitCode;
};

exports.tailMain = tailMain;
