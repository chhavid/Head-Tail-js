const { splitContent, joinLines } = require('./utilityFns.js');

const sliceFrom = (content, count, offsetBottom) => {
  if (offsetBottom) {
    return content.slice(count - 1);
  }
  return content.slice(-count);
};

const getLines = (content, count, offsetBottom) => {
  const lines = splitContent(content);
  const headLines = sliceFrom(lines, count, offsetBottom);
  return joinLines(headLines);
};

const tail = (content, { name, limit, offsetBottom }) =>
  name === 'byte' ? sliceFrom(content, limit, offsetBottom) :
    getLines(content, limit, offsetBottom);

exports.tail = tail;
exports.getLines = getLines;
