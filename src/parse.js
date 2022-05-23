const hasValue = function (option) {
  return /^-.*\d/.test(option);
};

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

const validateOptions = function (option, newOption) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (/^-\d/.test(newOption)) {
    return '';
  } else if (!keys[newOption.slice(0, 2)]) {
    throw `illegal option ${newOption}`;
  } else if (option !== keys[newOption.slice(0, 2)]) {
    throw 'can not combine line and byte counts';
  }
};

const parseArgs = function (args) {
  const options = getOptions(args[0]);
  for (let index = 0; index < args.length; index++) {
    if (!/^-./.test(args[index])) {
      return { files: [...args.slice(index)], options };
    }
    validateOptions(options.name, args[index]);
    options.limit = getLimit(args[index]);
    if (!hasValue(args[index])) {
      options.limit = +args[index + 1];
      index++;
    }
  }
  throw 'usage: head [-n lines | -c bytes] [file ...]';
};

exports.parseArgs = parseArgs;
exports.validateOptions = validateOptions;
exports.getOptions = getOptions;
exports.getLimit = getLimit;
