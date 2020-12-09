import { Customer } from '../../../../../contexts/data/data.models';

export type Form = Omit<Customer, 'id'>;
