const { getFormater } = require('./utilityFns.js');
const { tail } = require('./tailLib.js');
const { parseArgs } = require('./parseTail.js');
const { print, exitCode } = require('./headMain.js');
const { validateArgs } = require('./validateTailArgs.js');

const tailOfFile = (file, readFile, options) => {
  const result = { file };
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (err) {
    result.error = 'tail: ' + file + ': No such file or directory';
    return result;
  }
  result.content = tail(content, options);
  return result;

};

const tailMain = function (readFile, consoles, args) {
  validateArgs(args);
  const usage = 'usage: tail [-c # | -n #] [file ...]';
  const { files, options } = parseArgs(args, usage);
  const formater = getFormater(files);
  const tailResults = files.map(file => tailOfFile(file, readFile, options));
  tailResults.forEach((result) => print(result, consoles, formater));
  return exitCode(tailResults);
};

exports.tailMain = tailMain;
exports.tailAFile = tailOfFile;
