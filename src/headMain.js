const { parseArgs } = require('./parse.js');
const { head, firstNBytes, firstNLines } = require('./headLib.js');
const { getFormater } = require('./utilityFns');

const headOfFile = (file, readFile, options, headFn) => {
  const result = { file };
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (err) {
    result.error = 'head: ' + file + ': No such file or directory';
    return result;
  }
  result.content = head(content, options, headFn);
  return result;
};

const print = (headContent, loggers, formater) => {
  if (headContent.error) {
    loggers.error(headContent.error);
    return;
  }
  loggers.log(formater(headContent.content, headContent.file));
};

const exitCode = (results) => results.find((res) => res.error) ? 1 : 0;

const headFn = ({ name }) => name === 'byte' ? firstNBytes : firstNLines;

const headMain = (readFile, loggers, args) => {
  const { files, options } = parseArgs(args);
  const formater = getFormater(files);
  const headResults = files.map(file =>
    headOfFile(file, readFile, options, headFn(options)));
  headResults.forEach((result) => print(result, loggers, formater));
  return exitCode(headResults);
};

exports.headMain = headMain;
exports.headAFile = headOfFile;
exports.print = print;
exports.exitCode = exitCode;
