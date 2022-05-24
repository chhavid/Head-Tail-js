const console = require('console');
const fs = require('fs');
const { exit } = require('process');

const { headMain } = require('./src/headMain.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    const exitCode = headMain(fs.readFileSync, console, ...args);
    exit(exitCode);
  } catch (error) {
    console.error(error.message);
    exit(1);
  }
};

main();

