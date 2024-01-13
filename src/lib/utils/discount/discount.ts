export const getDiscountPercentage = (
  fullPrice: number,
  discountedPrice: number,
) => `${Math.round(100 - (discountedPrice * 100) / fullPrice)}% off`;
