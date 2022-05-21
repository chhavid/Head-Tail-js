const fs = require('fs');

const { headMain } = require('./src/headMain.js');

const main = () => {
  try {
    const content = headMain(fs.readFileSync, ...process.argv.slice(2));
    console.log(...content);
  } catch (error) {
    console.log(error.message);
  }
};

main();

// console.log('usage: head [-n lines | -c bytes] [file ...]');
