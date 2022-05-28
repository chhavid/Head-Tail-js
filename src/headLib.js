const { splitContent, joinLines } = require('./utilityFns');
const startIndex = 0;

const sliceUpto = (content, count) => content.slice(startIndex, count);

const firstNLines = (content, count) => {
  const lines = splitContent(content);
  const headLines = sliceUpto(lines, count);
  return joinLines(headLines);
};

const firstNBytes = (content, limit) => sliceUpto(content, limit);

const head = (content, { name, limit }) =>
  name === 'byte' ? firstNBytes(content, limit) : firstNLines(content, limit);

exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.sliceUpto = sliceUpto;
exports.head = head;
