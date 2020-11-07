import { Invoice } from '../../contexts/data/data.models';

interface InvoicesGroup {
  [key: string]: Invoice[];
}

export function groupInvoices(invoices: Invoice[]) {
  return invoices.reduce((accumulator: InvoicesGroup, invoice) => {
    const group = `${invoice.issueDate.getMonth() + 1}-${invoice.issueDate.getFullYear()}`;

    if (accumulator[group]) {
      return { ...accumulator, [group]: [...accumulator[group], invoice] };
    }

    return { ...accumulator, [group]: [invoice] };
  }, {});
}
