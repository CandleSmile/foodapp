String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

export const checkSpaces = (text) => text.replaceAll(/,(\S)/, ", $1");
