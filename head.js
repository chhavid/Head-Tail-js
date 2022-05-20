const fs = require('fs');

const { headMain } = require('./src/headLib.js');

console.log(headMain(fs.readFileSync, process.argv[2]));

// console.log('usage: head [-n lines | -c bytes] [file ...]');
