const formatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });

export const formatPrice = (price: number) => formatter.format(price);
