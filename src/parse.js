const getOptions = function (arg) {
  const options = { name: 'count', limit: 10 };
  if (arg.slice(0, 2) === '-c') {
    options.name = 'bytes';
  }
  return options;
};

const getLimit = function (args) {
  if (/^-\d/.test(args)) {
    return +args.slice(1);
  }
  return +args.slice(2);
};

const validateLimit = function (limit) {
  if (!limit) {
    throw { message: 'head: illegal count -- 0' };
  }
};

const formatArg = function (arg) {
  if (/^-\d/.test(arg)) {
    return ['-n', arg.slice(1)];
  }
  return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const validateOptions = function (options, newOption) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (/^-\d/.test(newOption)) {
    return '';
  } else if (!keys[newOption.slice(0, 2)]) {
    throw { message: `invalid option ${newOption}` };
  } else if (options.name !== keys[newOption.slice(0, 2)]) {
    throw { message: 'can not combine line and byte counts' };
  }
  validateLimit(options.limit);
};

const parseArgs = function (parameters) {
  const options = getOptions(parameters[0]);
  const args = parameters.flatMap(formatArg).filter(arg => arg.length > 0);

  for (let index = 0; index < args.length; index += 2) {
    if (!/^-./.test(args[index])) {
      const files = args.slice(index);
      return { files, options };
    }
    options.limit = +args[index + 1];
    validateOptions(options, args[index]);
  }
  throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
};

exports.parseArgs = parseArgs;
exports.validateOptions = validateOptions;
exports.validateLimit = validateLimit;
exports.getOptions = getOptions;
exports.getLimit = getLimit;
