const validateArgs = (args, message) => {
  if (args.length === 0) {
    throw { message };
  }
};

const validateLimit = ({ name, limit }) => {
  if (!+limit) {
    throw { message: `head: illegal ${name} count -- ${limit}` };
  }
};

const isOptionValid = (option, keys) => keys[option.slice(0, 2)];

const isCombined = (prevOption, currentOption, keys) =>
  prevOption !== keys[currentOption.slice(0, 2)];

const validateOptions = function (options, currentOption) {
  const keys = { '-n': 'line', '-c': 'byte' };
  if (isFinite(currentOption[1])) {
    return '';
  }
  if (!isOptionValid(currentOption, keys)) {
    throw {
      message: `head: invalid option -- ${currentOption.slice(1)}\n` +
        'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  if (isCombined(options.name, currentOption, keys)) {
    throw { message: 'head: can\'t combine line and byte counts' };
  }
  validateLimit(options);
  options.limit = +options.limit;
};

const isOption = (arg) => /^-/.test(arg);

exports.validateOptions = validateOptions;
exports.validateLimit = validateLimit;
exports.isOption = isOption;
exports.validateArgs = validateArgs;
