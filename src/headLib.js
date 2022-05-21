const NEWLINE = '\n';
const startIndex = 0;

const splitContent = (content) => content.split(NEWLINE);

const joinLines = (lines) => lines.join(NEWLINE);

const sliceUpto = function (content, count) {
  return content.slice(startIndex, count);
};

const getLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = sliceUpto(lines, count);
  return joinLines(headLines);
};

exports.getLines = getLines;
exports.sliceUpto = sliceUpto;
