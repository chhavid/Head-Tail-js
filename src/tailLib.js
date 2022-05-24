const { splitContent, joinLines } = require('./headLib');

const sliceUpto = function (content, count) {
  return content.slice(-count);
};

const getLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = sliceUpto(lines, count);
  return joinLines(headLines);
};

const tail = function (content, { name, limit }) {
  return name === 'byte' ? sliceUpto(content, limit) : getLines(content, limit);
};

exports.tail = tail;
exports.getLines = getLines;
