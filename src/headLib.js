const splitContent = (content) => content.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (content, count) => {
  const start = 0;
  return content.slice(start, count);
};

const head = function (content, { count, byte }) {
  if (byte) {
    return content.slice(0, byte);
  }
  const lines = splitContent(content);
  const headLines = firstLines(lines, count);
  return joinLines(headLines);
};

exports.head = head;
exports.firstLines = firstLines;
