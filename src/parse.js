const parseArgs = args => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = {};
  let fileName = args;

  if (/^-.$/.test(...args)) {
    const key = keys[args[0]];
    options[key] = +args[1];
    fileName = args.slice(2);
  } else {
    options.count = 10;
  }
  return { fileName, options };
};

exports.parseArgs = parseArgs;
