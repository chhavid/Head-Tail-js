const { parseArgs } = require('./parse.js');
const { getLines, sliceUpto } = require('./headLib.js');

const head = (content, { name, limit }) =>
  name === 'byte' ? sliceUpto(content, limit) : getLines(content, limit);

const formatContent = (content, file) => `==> ${file} <==\n${content}\n`;

const identityFormatter = (content) => content;

const areMultipleFiles = (files) => files.length > 1;

const headForAFile = (file, readFile, options) => {
  const result = { file };
  try {
    result.content = head(readFile(file, 'utf8'), options);
  } catch (err) {
    result.error = 'head: ' + file + ': No such file or directory';
  }
  return result;
};

const print = (headContent, loggers, format) => {
  if (headContent.error) {
    loggers.error(headContent.error);
    return;
  }
  loggers.log(format(headContent.content, headContent.file));
};

const failedCount = (headResult) => headResult.find((res) => res.error) ? 1 : 0;

const parseOptions = (args) => {
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  if (args.length === 0) {
    throw { message: usage };
  }
  return parseArgs(args, usage);
};

const headMain = function (readFile, loggers, ...args) {
  const { files, options } = parseOptions(args);
  const format = areMultipleFiles(files) ? formatContent : identityFormatter;
  const headResult = files.map(file => headForAFile(file, readFile, options));
  headResult.forEach((headContent) => print(headContent, loggers, format));
  return failedCount(headResult);
};

exports.head = head;
exports.headMain = headMain;
exports.formatContent = formatContent;
