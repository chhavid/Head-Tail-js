const { validateOptions, isOption, validateArgs } = require('./validators.js');

const getOptions = function (arg) {
  const options = { name: 'line', limit: 10 };
  if (arg.slice(0, 2) === '-c') {
    options.name = 'byte';
  }
  return options;
};

const formatArgs = function (arg) {
  if (arg.startsWith('-') && isFinite(arg[1])) {
    return ['-n', arg.slice(1)];
  }
  return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const splitArgs = (args) => {
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parse = function (args) {
  const options = getOptions(args[0]);
  let index = 0;
  while (isOption(args[index])) {
    options.limit = args[index + 1];
    validateOptions(options, args[index]);
    index += 2;
  }
  const files = args.slice(index);
  return { files, options };
};

const parseArgs = function (parameters, erroMessage) {
  validateArgs(parameters, erroMessage);
  const args = splitArgs(parameters);
  const { files, options } = parse(args);
  if (files.length === 0) {
    throw { message: erroMessage };
  }
  return { files, options };
};

exports.parse = parse;
exports.parseArgs = parseArgs;
exports.getOptions = getOptions;
exports.formatArgs = formatArgs;
