import { Customer } from '../../../contexts/data/data.models';

export interface Props {
  customers: Customer[];
  handleEdit: (id: string) => () => void;
}
