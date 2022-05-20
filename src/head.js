const head = function (content) {
  const lines = content.split('\n');
  const startLines = lines.slice(0, 10);
  return startLines.join('\n');
};

exports.head = head;
