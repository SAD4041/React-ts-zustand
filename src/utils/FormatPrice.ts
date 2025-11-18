export const formatPrice = (value: number): string => {
  if (value >= 1000000) {
    const million = value / 1000000;
    if (million % 1 === 0) {
      return `${million} میلیون تومان`;
    } else {
      return `${million.toFixed(1).replace('.', '/')} میلیون تومان`;
    }
  } else if (value >= 1000) {
    const thousand = value / 1000;
    return `${thousand} هزار تومان`;
  } else {
    return `${value} تومان`;
  }
};