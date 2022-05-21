const parseArgs = function (args) {
  const files = [];
  const keys = { '-n': 'count', '-c': 'bytes' };
  const options = { name: 'count', limit: 10 };

  for (let index = 0; index < args.length; index += 2) {
    if (/^-.$/.test(args[index])) {
      options.name = keys[args[index]];
      options.limit = + args[index + 1];
    } else {
      files.push(...args.slice(index));
      return { files, options };
    }
  }
  throw 'usage: head [-n lines | -c bytes] [file ...]';
};

exports.parseArgs = parseArgs;
