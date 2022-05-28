const { splitContent, joinLines } = require('./utilityFns.js');

const sliceFrom = (content, count, offsetTop) => {
  if (offsetTop) {
    return content.slice(count - 1);
  }
  return content.slice(-count);
};

const getLines = (content, count, offsetTop) => {
  const lines = splitContent(content);
  const headLines = sliceFrom(lines, count, offsetTop);
  return joinLines(headLines);
};

const tail = (content, { name, limit, offsetTop }) =>
  name === 'byte' ? sliceFrom(content, limit, offsetTop) :
    getLines(content, limit, offsetTop);

exports.tail = tail;
exports.getLines = getLines;
