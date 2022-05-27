const fs = require('fs');

const { headMain } = require('./src/headMain.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    const exitCode = headMain(fs.readFileSync, console, args);
    process.exitCode = exitCode;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();
