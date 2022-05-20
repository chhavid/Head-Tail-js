const splitContent = (content) => content.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (content, count) =>
  content.slice(0, count);

const head = function (content) {
  const lines = splitContent(content);
  const headLines = firstLines(lines, 10);
  return joinLines(headLines);
};

exports.head = head;
exports.firstLines = firstLines;
