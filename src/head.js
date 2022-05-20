const splitContent = (content) => content.split('\n');

const joinLines = (lines) => lines.join('\n');

const firstLines = (content) => content.slice(0, 10);

const head = function (content) {
  const lines = splitContent(content);
  const headLines = firstLines(lines);
  return joinLines(headLines);
};

exports.head = head;
