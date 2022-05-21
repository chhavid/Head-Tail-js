const defaultOptions = function (args) {
  const fileName = args;
  const options = { count: 10 };
  return { fileName, options };
};

const parseOptions = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = {};
  const key = keys[args[0]];
  options[key] = +args[1];
  const fileName = args.slice(2);
  return { fileName, options };
};

const parseArgs = args => {
  const hasOptions = /^-.$/.test(...args);
  return hasOptions ? parseOptions(args) : defaultOptions(args);
};

exports.parseArgs = parseArgs;
exports.defaultOptions = defaultOptions;
exports.parseOptions = parseOptions;
