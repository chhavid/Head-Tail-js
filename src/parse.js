const { validateOptions, isOption, validateFiles, validateCombinations } =
  require('./validators.js');

const formatArgs = function (arg) {
  if (arg.startsWith('-') && isFinite(arg[1])) {
    return ['-n', arg.slice(1)];
  }
  return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const splitArgs = (args) => {
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parse = function (args, flagNames) {
  const options = { name: 'line', limit: 10 };
  let index = 0;
  while (isOption(args[index])) {
    options.name = flagNames[args[index]];
    options.limit = args[index + 1];
    validateOptions(options, args[index]);
    index += 2;
  }
  const files = args.slice(index);
  validateFiles(files);
  return { files, options };
};

const parseArgs = function (parameters) {
  const flagNames = { '-n': 'line', '-c': 'byte' };
  const args = splitArgs(parameters);

  validateCombinations(args);
  return parse(args, flagNames);
};

exports.parse = parse;
exports.parseArgs = parseArgs;
exports.formatArgs = formatArgs;
