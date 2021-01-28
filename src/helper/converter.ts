export function round(value: number, decimalPlaces: number) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(value * factorOfTen) / factorOfTen;
}

export function calculateAssetPair(pool1: number, pool2: number, assetAmount2: number) {
  return (pool1 / pool2) * assetAmount2;
}