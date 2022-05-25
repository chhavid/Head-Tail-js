const { parseArgs } = require('./parse.js');
const { head } = require('./headLib.js');
const { getFormater } = require('./utilityFns');

const headAFile = (file, readFile, options) => {
  const result = { file };
  try {
    result.content = head(readFile(file, 'utf8'), options);
  } catch (err) {
    result.error = 'head: ' + file + ': No such file or directory';
  }
  return result;
};

const print = (headContent, loggers, formater) => {
  if (headContent.error) {
    loggers.error(headContent.error);
    return;
  }
  loggers.log(formater(headContent.content, headContent.file));
};

const exitCode = (headResults) => headResults.find((res) => res.error) ? 1 : 0;

const headMain = function (readFile, loggers, ...args) {
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  const { files, options } = parseArgs(args, usage);
  const formater = getFormater(files);
  const headResults = files.map(file => headAFile(file, readFile, options));
  headResults.forEach((result) => print(result, loggers, formater));
  return exitCode(headResults);
};

exports.headMain = headMain;
exports.headAFile = headAFile;
exports.print = print;
exports.exitCode = exitCode;
