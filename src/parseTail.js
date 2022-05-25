const { validateOptions, isOption, validateArgs } = require('./validate.js');
const { getOptions } = require('./parse');

const getValue = (number) => {
  if (number.startsWith('+')) {
    return '-' + (Math.abs(number) - 1);
  }
  return number;
};

const isArgComplete = (arg) => /^[-+].*\d/.test(arg) || !/^[-+]/.test(arg);

const parseFiniteOption = (arg) =>
  arg.startsWith('+') ? ['-n', getValue(arg)] : ['-n', arg.slice(1)];

const splitArg = function (arg) {
  if (!/^[-+]/.test(arg)) {
    return arg;
  }
  if (isFinite(arg)) {
    return parseFiniteOption(arg);
  }
  return [arg.slice(0, 2), getValue(arg.slice(2))];
};

const getArgs = function (args) {
  const formattedArgs = [];
  for (let index = 0; index < args.length; index++) {
    if (!isArgComplete(args[index])) {
      formattedArgs.push(args[index], getValue(args[index + 1]));
      index++;
    } else {
      formattedArgs.push(splitArg(args[index]));
    }
  }
  return formattedArgs.flat().filter(arg => arg.length > 0);
};

const parseArgs = function (parameters, erroMessage) {
  validateArgs(parameters);
  const options = getOptions(parameters[0]);
  const args = getArgs(parameters);

  for (let index = 0; index < args.length; index += 2) {
    if (!isOption(args[index])) {
      const files = args.slice(index);
      return { files, options };
    }
    options.limit = args[index + 1];
    validateOptions(options, args[index]);
  }
  throw { message: erroMessage };
};

exports.parseArgs = parseArgs;
