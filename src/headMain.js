const { parseArgs } = require('./parse.js');
const { head } = require('./headLib.js');
const { getFormater } = require('./utilityFns');

const headForAFile = (file, readFile, options) => {
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

const exitCode = (headResult) => headResult.find((res) => res.error) ? 1 : 0;

const parseArguments = (args) => {
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  if (args.length === 0) {
    throw { message: usage };
  }
  return parseArgs(args, usage);
};

const headMain = function (readFile, loggers, ...args) {
  const { files, options } = parseArguments(args);
  const formater = getFormater(files);
  const headResult = files.map(file => headForAFile(file, readFile, options));
  headResult.forEach((headContent) => print(headContent, loggers, formater));
  return exitCode(headResult);
};

exports.head = head;
exports.headMain = headMain;
exports.headForAFile = headForAFile;
exports.print = print;
exports.parseArguments = parseArguments;
