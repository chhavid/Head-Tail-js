const { splitContent, joinLines } = require('./headLib');

const sliceFrom = function (content, count) {
  return content.slice(-count);
};

const getLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = sliceFrom(lines, count);
  return joinLines(headLines);
};

const tail = function (content, { name, limit }) {
  return name === 'byte' ? sliceFrom(content, limit) : getLines(content, limit);
};

exports.tail = tail;
exports.getLines = getLines;
