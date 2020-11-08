import { Expense } from '../../../contexts/data/data.models';

export interface Props {
  expenses: Expense[];
  handleEdit: (id: string) => () => void;
}
