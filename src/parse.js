const parseArgs = function (args) {
  const fileName = [];
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { name: 'count', limit: 10 };

  for (let index = 0; index < args.length; index += 2) {
    if (/^-.$/.test(args[index])) {
      options.name = keys[args[index]];

      options.limit = + args[index + 1];
    } else {
      fileName.push(...args.slice(index));
      return { fileName, options };
    }
  }
  return { fileName, options };
};

exports.parseArgs = parseArgs;
