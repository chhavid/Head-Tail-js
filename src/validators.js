const usage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const validateFiles = (args) => {
  if (args.length === 0) {
    const message = usage();
    throw { message };
  }
};

const validateLimit = ({ name, limit }) => {
  if (!+limit) {
    throw { message: `head: illegal ${name} count -- ${limit}` };
  }
};

const isOptionValid = (option, flagNames) => {
  return flagNames[option] || isFinite(option);
};

const validateCombinations = function (args) {
  if (args.includes('-n') && args.includes('-c')) {
    throw { message: 'head: can\'t combine line and byte counts' };
  }
};

const validateOptions = function (options, currentOption) {
  const flagNames = { '-n': 'line', '-c': 'byte' };
  if (!isOptionValid(currentOption, flagNames)) {
    throw {
      message: `head: invalid option -- ${currentOption.slice(1)}\n` +
        usage()
    };
  }
  validateLimit(options);
  options.limit = +options.limit;
};

const isOption = (arg) => /^-/.test(arg);

exports.validateOptions = validateOptions;
exports.validateLimit = validateLimit;
exports.isOption = isOption;
exports.validateFiles = validateFiles;
exports.validateCombinations = validateCombinations;
exports.isOptionValid = isOptionValid;
