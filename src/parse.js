const { validateOptions, isOption } = require('./validate.js');

const getOptions = function (arg) {
  const options = { name: 'line', limit: 10 };
  if (arg.slice(0, 2) === '-c') {
    options.name = 'byte';
  }
  return options;
};

const formatArgs = function (arg) {
  if (arg.startsWith('-') && isFinite(arg[1])) {
    return ['-n', arg.slice(1)];
  }
  return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const getArgs = (args) => {
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseArgs = function (parameters, erroMessage) {
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
exports.getOptions = getOptions;
exports.formatArgs = formatArgs;
