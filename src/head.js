const firstLines = function (content) {
  return content.slice(0, 10);
};

const head = function (content) {
  const lines = content.split('\n');
  const headLines = firstLines(lines);
  return headLines.join('\n');
};

exports.head = head;
