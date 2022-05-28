const { validateOptions, isOption, validateFiles, validateCombinations } =
  require('./validators.js');

const isNumericOption = opt => isOption(opt) && isFinite(opt.slice(1));

const separateOption = option => [option.slice(0, 2), option.slice(2)];

const standardizeArgs = (arg) => {
  if (isNumericOption(arg)) {
    return ['-n', arg.slice(1)];
  }
  return isOption(arg) ? separateOption(arg) : arg;
};

const splitArgs = (args) => {
  const formattedArgs = args.flatMap(standardizeArgs);
  return formattedArgs.filter(arg => arg);
};

const parse = (args, flagNames) => {
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

const parseArgs = (parameters) => {
  const flagNames = { '-n': 'line', '-c': 'byte' };
  const args = splitArgs(parameters);

  validateCombinations(args);
  return parse(args, flagNames);
};

exports.parse = parse;
exports.parseArgs = parseArgs;
exports.standardizeArgs = standardizeArgs;
