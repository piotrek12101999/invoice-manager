export function roundNumber(number: number): number {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

export function calculateGrossAmount(quantity: string, netPrice: string, VATRate: string): number {
  return roundNumber(parseFloat(quantity) * (parseFloat(netPrice) * ((100 + parseFloat(VATRate)) / 100)) || 0);
}

export function calculateNetPrice(quantity: string, grossAmount: string, VATRate: string): number {
  return roundNumber(parseFloat(grossAmount) / parseFloat(quantity) / ((100 + parseFloat(VATRate)) / 100) || 0);
}
