const splitContent = (content) => content.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (content, count) => {
  const start = 0;
  return content.slice(start, count);
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
