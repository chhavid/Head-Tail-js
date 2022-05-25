const { getFormater } = require('./utilityFns.js');
const { tail } = require('./tailLib.js');
const { parseArgs } = require('./parseTail.js');
const { print, exitCode } = require('./headMain.js');

const tailAFile = (file, readFile, options) => {
  const result = { file };
  try {
    result.content = tail(readFile(file, 'utf8'), options);
  } catch (err) {
    result.error = 'tail: ' + file + ': No such file or directory';
  }
  return result;
};

const tailMain = function (readFile, consoles, ...args) {
  const usage = 'usage: tail [-c # | -n #] [file ...]';
  const { files, options } = parseArgs(args, usage);
  const formater = getFormater(files);
  const tailResults = files.map(file => tailAFile(file, readFile, options));
  tailResults.forEach((result) => print(result, consoles, formater));
  return exitCode(tailResults);
};

exports.tailMain = tailMain;
exports.tailAFile = tailAFile;
