import { Customer } from '../../../../../contexts/data/data.models';

type FormWithoutRedundantValues = Omit<Omit<Customer, 'id'>, 'mailingList'>;

export interface Form extends FormWithoutRedundantValues {
  mailingList: { value: string }[];
}
