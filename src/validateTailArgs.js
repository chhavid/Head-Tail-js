const validateArgs = (args) => {
  if (args.length === 0) {
    throw { message: 'usage: tail [-r] [-q] [-c # | -n #] [file ...' };
  }
};

const validateLimit = ({ name, limit }) => {
  if (!isFinite(limit)) {
    throw { message: `head: illegal ${name} count -- ${limit}` };
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

exports.validateOptions = validateOptions;
exports.validateArgs = validateArgs;
exports.validateLimit = validateLimit;
