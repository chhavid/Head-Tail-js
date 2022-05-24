const NEWLINE = '\n';

const formatContent = (content, file) => `==> ${file} <==\n${content}\n`;

const identityFormatter = (content) => content;

const areMultipleFiles = (files) => files.length > 1;

const getFormater = (files) =>
  areMultipleFiles(files) ? formatContent : identityFormatter;

const splitContent = (content) => content.split(NEWLINE);

const joinLines = (lines) => lines.join(NEWLINE);

exports.getFormater = getFormater;
exports.splitContent = splitContent;
exports.joinLines = joinLines;
