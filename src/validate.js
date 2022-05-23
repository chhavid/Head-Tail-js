const validateLimit = function (limit) {
  if (!limit) {
    throw { message: 'head: illegal count -- 0' };
  }
};

const validateOptions = function (options, newOption) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  if (isFinite(newOption[1])) {
    return '';
  } else if (!keys[newOption.slice(0, 2)]) {
    throw { message: `invalid option ${newOption}` };
  } else if (options.name !== keys[newOption.slice(0, 2)]) {
    throw { message: 'can not combine line and byte counts' };
  }
  validateLimit(options.limit);
};

const isOption = function (arg) {
  return arg.startsWith('-');
};

exports.validateOptions = validateOptions;
exports.validateLimit = validateLimit;
exports.isOption = isOption;
