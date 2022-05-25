const validateArgs = (args) => {
  if (args.length === 0) {
    throw { message: 'usage: tail [-r] [-q] [-c # | -n #] [file ...' };
  }
};

const isOptionValid = (option, keys) => keys[option.slice(0, 2)];

const validateOptions = function (newOption) {
  const keys = { '-n': 'line', '-c': 'byte', '-r': 'reverse', '-q': 'quiet' };
  if (isFinite(newOption[1])) {
    return '';
  }
  if (!isOptionValid(newOption, keys)) {
    throw {
      message: `tail: invalid option -- ${newOption.slice(1)}\n` +
        'usage: tail [-r] [-q] [-c # | -n #] [file ...'
    };
  }
};

const isOption = (arg) => arg.startsWith('-');

exports.validateOptions = validateOptions;
exports.isOption = isOption;
exports.validateArgs = validateArgs;
