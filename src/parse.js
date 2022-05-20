const parseArgs = args => {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = {};
  const option = args[0];
  const value = args[1];
  if (args.length > 1) {
    const key = keys[option];
    options[key] = +value;
  }
  if (Object.keys(options).length === 0) {
    options.count = 10;
  }
  return { fileName: args[args.length - 1], options };
};

exports.parseArgs = parseArgs;
