const validateArgs = function (args) {
  if (args.length === 0) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
};

const validateLimit = function ({ name, limit }) {
  if (!+limit) {
    throw { message: `head: illegal ${name} count -- ${limit}` };
  }
};

const isOptionValid = function (option, keys) {
  return keys[option.slice(0, 2)];
};

const isCombined = function (prevOption, newOption, keys) {
  return prevOption !== keys[newOption.slice(0, 2)];
};

const validateOptions = function (options, newOption) {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  if (isFinite(newOption[1])) {
    return '';
  } if (!isOptionValid(newOption, keys)) {
    throw { message: `invalid option ${newOption}` };
  } if (isCombined(options.name, newOption, keys)) {
    throw { message: 'can not combine line and byte counts' };
  }
  validateLimit(options);
  options.limit = +options.limit;
};

const isOption = function (arg) {
  return arg.startsWith('-');
};

exports.validateOptions = validateOptions;
exports.validateLimit = validateLimit;
exports.isOption = isOption;
exports.validateArgs = validateArgs;
