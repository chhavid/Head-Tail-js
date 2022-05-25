const fs = require('fs');

const { tailMain } = require('./src/tailMain.js');

const main = () => {
  const args = process.argv.slice(2);
  try {
    const exitCode = tailMain(fs.readFileSync, console, args);
    process.exit(exitCode);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();
