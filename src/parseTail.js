// const { validateOptions } = require('./validateTailArgs.js');

const isOption = function (arg) {
  return /^[-+]/.test(arg) && arg.length > 1;
};

const isOptionComplete = function (option) {
  return isFinite(option) || /\d/.test(option.slice(2));
};

const parseOptions = function (arg, options) {
  let index = 1;
  if (!isFinite(arg)) {
    options.flag = arg.slice(0, 2);
    index = 2;
  }
  options.limit = Math.abs(arg.slice(index));
  options.offsetTop = arg.includes('+');
};

const getOptions = function (option, value, options) {
  options.flag = option;
  options.limit = Math.abs(value);
  options.offsetTop = value.startsWith('+');
};

const defaultOptions = () => {
  return {
    flag: '-n', limit: 10,
    offsetTop: false, reverse: false, format: true
  };
};

const updateOption = (flag, options) => {
  options.reverse = flag === '-r';
  options.format = flag !== '-q';
};

const isOptionWithoutValue = (option) => option === '-q' || option === '-r';

const parse = args => {
  const options = defaultOptions();
  for (let index = 0; index < args.length; index++) {
    if (isOptionWithoutValue(args[index])) {
      updateOption(args[index], options);
    } else if (isOptionComplete(args[index])) {
      parseOptions(args[index], options);
    } else {
      getOptions(args[index], args[index + 1], options);
      index++;
    }
  }
  return options;
};

const separateArgs = args => {
  let index = 0;
  const options = [];
  while (isOption(args[index]) || isFinite(args[index])) {
    options.push(args[index]);
    index++;
  }
  const files = args.slice(index);
  return { optionArgs: options, files };
};

const parseArgs = function (args) {
  const { optionArgs, files } = separateArgs(args);
  const options = parse(optionArgs);

  return { files, options };
};

exports.parseArgs = parseArgs;
