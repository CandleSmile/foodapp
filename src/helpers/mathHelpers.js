export const roundNumber = (number, digits) => {
  var multiple = Math.pow(10, digits);
  var roundedNumber = Math.round(number * multiple) / multiple;
  return roundedNumber;
};
