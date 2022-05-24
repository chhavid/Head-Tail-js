const { splitContent, joinLines } = require('./utilityFns');
const startIndex = 0;

const sliceUpto = (content, count) => content.slice(startIndex, count);

const getLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = sliceUpto(lines, count);
  return joinLines(headLines);
};

const head = (content, { name, limit }) =>
  name === 'byte' ? sliceUpto(content, limit) : getLines(content, limit);

exports.getLines = getLines;
exports.sliceUpto = sliceUpto;
exports.head = head;
