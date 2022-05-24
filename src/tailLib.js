const { splitContent, joinLines } = require('./utilityFns.js');

const sliceFrom = (content, count) => content.slice(-count);

const getLines = (content, count) => {
  const lines = splitContent(content);
  const headLines = sliceFrom(lines, count);
  return joinLines(headLines);
};

const tail = (content, { name, limit }) =>
  name === 'byte' ? sliceFrom(content, limit) : getLines(content, limit);

exports.tail = tail;
exports.getLines = getLines;
