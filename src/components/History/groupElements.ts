import { Invoice, Expense } from '../../contexts/data/data.models';

export interface HistoryInvoice extends Invoice {
  type: 'invoice';
}

export interface HistoryExpense extends Expense {
  type: 'expense';
}

export type HistoryElement = HistoryInvoice | HistoryExpense;

interface HistoryGroup {
  [key: string]: HistoryElement[];
}

export function groupElements(elements: HistoryElement[]) {
  const groupedElements = elements.reduce((accumulator: HistoryGroup, element) => {
    const group =
      element.type === 'expense'
        ? `${element.purchaseDate.getMonth() + 1}-${element.purchaseDate.getFullYear()}`
        : `${element.issueDate.getMonth() + 1}-${element.issueDate.getFullYear()}`;

    if (accumulator[group]) {
      return { ...accumulator, [group]: [...accumulator[group], element] };
    }

    return { ...accumulator, [group]: [element] };
  }, {});

  Object.keys(groupedElements).forEach((key) => {
    groupedElements[key] = groupedElements[key].sort((a, b) => {
      if (a.type === 'expense' && b.type === 'expense') {
        return b.purchaseDate.getTime() - a.purchaseDate.getTime();
      } else if (a.type === 'expense' && b.type === 'invoice') {
        return b.issueDate.getTime() - a.purchaseDate.getTime();
      } else if (a.type === 'invoice' && b.type === 'invoice') {
        return b.issueDate.getTime() - a.issueDate.getTime();
      } else if (a.type === 'invoice' && b.type === 'expense') {
        return b.purchaseDate.getTime() - a.issueDate.getTime();
      }

      return 0;
    });
  });

  return groupedElements;
}
