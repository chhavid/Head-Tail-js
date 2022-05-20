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
  return content.slice(startIndex, bytes);
};

const head = function (content, { count, byte }) {
  return byte ? giveBytes(content, byte) : giveLines(content, count);
};

const headMain = function (readFile, fileName) {
  const content = readFile(fileName, 'utf8');
  return head(content, { count: 10 });
};

exports.headMain = headMain;
exports.head = head;
exports.firstLines = firstLines;
exports.giveLines = giveLines;
exports.giveBytes = giveBytes;
