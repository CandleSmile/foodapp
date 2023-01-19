export const roundNumber = (number, digits) => {
  const multiple = Math.pow(10, digits);
  const roundedNumber = Math.round(number * multiple) / multiple;
  return roundedNumber;
};
