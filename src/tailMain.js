const { getFormater } = require('./utilityFns.js');
const { tail } = require('./tailLib.js');
const { parseArgs } = require('./parse.js');

const validateArgs = (args) => {
  if (args.length === 0) {
    throw { message: 'usage: tail [-c # | -n #] [file ...]' };
  }
};

const tailMain = function (readFile, { log, error }, ...args) {
  validateArgs(args);
  const errorMessage = 'usage: tail [-c # | -n #] [file ...]';
  const { files, options } = parseArgs(args, errorMessage);
  let exitCode = 0;
  files.forEach((file) => {
    try {
      const content = tail(readFile(file, 'utf8'), options);
      const formatter = getFormater(files);
      log(formatter(content, file, files.length));
    } catch (err) {
      exitCode = 1;
      error('tail: ' + file + ': No such file or directory');
    }
  });
  return exitCode;
};

exports.tailMain = tailMain;
exports.validateArgs = validateArgs;
