const fs = require('fs');

const { headMain } = require('./src/headMain.js');

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('usage: head [-n lines | -c bytes] [file ...]');
    return 2;
  }
  try {
    const content = headMain(fs.readFileSync, ...args);
    console.log(...content);
  } catch (error) {
    console.log(error.message);
    process.exit(3);
  }
};

main();

