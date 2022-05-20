const NEWLINE = '\n';
const startIndex = 0;

const splitContent = (content) => content.split(NEWLINE);

const joinLines = (lines) => lines.join(NEWLINE);

const firstLines = (content, count) => {
  return content.slice(startIndex, count);
};

const getLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = firstLines(lines, count);
  return joinLines(headLines);
};

const getBytes = function (content, bytes) {
  return content.slice(startIndex, bytes);
};

exports.firstLines = firstLines;
exports.getLines = getLines;
exports.getBytes = getBytes;
