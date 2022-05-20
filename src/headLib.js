const NEWLINE = '\n';
const startIndex = 0;

const splitContent = (content) => content.split(NEWLINE);

const joinLines = (lines) => lines.join(NEWLINE);

const firstLines = (content, count) => {
  return content.slice(startIndex, count);
};

const giveLines = function (content, count) {
  const lines = splitContent(content);
  const headLines = firstLines(lines, count);
  return joinLines(headLines);
};

const giveBytes = function (content, bytes) {
  return content.slice(0, bytes);
};

const head = function (content, { count, byte }) {
  return byte ? giveBytes(content, byte) : giveLines(content, count);
};

exports.head = head;
exports.firstLines = firstLines;
exports.giveLines = giveLines;
exports.giveBytes = giveBytes;
