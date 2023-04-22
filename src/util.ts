export const round = (value: number, decimal = 1) => {
  const factor = Math.pow(10, decimal);
  return (Math.round(value * factor) / factor).toFixed(decimal);
};
