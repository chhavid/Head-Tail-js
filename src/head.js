const splitContent = (content) => content.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (content, count) =>
  content.slice(0, count);

const head = function (content, count) {
  const lines = splitContent(content);
  const headLines = firstLines(lines, count);
  return joinLines(headLines);
};

exports.head = head;
exports.firstLines = firstLines;
