export function roundNumber(number: number): number {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

export function calculateGrossAmount(quantity: string, netPrice: string, VATRate: string): string {
  return roundNumber(
    parseFloat(quantity) * (parseFloat(netPrice.replace(',', '.')) * ((100 + parseFloat(VATRate.replace(',', '.'))) / 100)) || 0
  ).toString();
}

export function calculateNetPrice(quantity: string, grossAmount: string, VATRate: string): string {
  return roundNumber(
    parseFloat(grossAmount.replace(',', '.')) / parseFloat(quantity) / ((100 + parseFloat(VATRate.replace(',', '.'))) / 100) || 0
  ).toString();
}
