const fs = require('fs');

const { headMain } = require('./src/headMain.js');

const main = () => {
  const args = process.argv.slice(2);
  const { log, error } = console;
  try {
    process.exitCode = headMain(fs.readFileSync, { log, error }, args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();
