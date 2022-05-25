const { validateOptions } = require('./validateTailArgs.js');

const isOption = function (arg) {
  return /^[-+]/.test(arg);
};

const isOptionComplete = function (option) {
  return isFinite(option) || /\d/.test(option.slice(2));
};

const parseOptions = function (arg, options) {
  const keys = { '-n': 'line', '-c': 'byte' };
  let index = 1;
  if (!isFinite(arg)) {
    options.name = keys[arg.slice(0, 2)];
    index = 2;
  }
  options.limit = Math.abs(arg.slice(index));
  options.offsetBottom = arg.includes('+');
};

const getOptions = function (option, value, options) {
  const keys = { '-n': 'line', '-c': 'byte' };
  options.name = keys[option];
  options.limit = Math.abs(value);
  options.offsetBottom = value.startsWith('+');

};

const parseArgs = function (args) {
  const options = { name: 'line', limit: 10, offsetBottom: false };
  let index = 0;
  while (isOption(args[index])) {
    validateOptions(args[index]);
    if (isOptionComplete(args[index])) {
      parseOptions(args[index], options);
      index++;
    } else {
      getOptions(args[index], args[index + 1], options);
      index += 2;
    }
  }
  return { files: args.slice(index), options };
};

exports.parseArgs = parseArgs;
