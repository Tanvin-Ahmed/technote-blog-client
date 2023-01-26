export const pageCounter = (totalAmount, rowPerPage) => {
  return Math.ceil(totalAmount / rowPerPage);
};
