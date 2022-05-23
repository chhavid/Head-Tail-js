const fs = require('fs');
const { exit } = require('process');

const { headMain } = require('./src/headMain.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    const content = headMain(fs.readFileSync, ...args);
    console.log(...content);
  } catch (error) {
    console.log(error.message);
    exit(1);
  }
};

main();

