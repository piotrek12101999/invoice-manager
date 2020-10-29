import { useForm, UseFormMethods } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import useData from '../../../../contexts/data/useData/useData';
import basicDataValidationSchema from './steps/BasicData/validationSchema';
import customerValidationSchema from '../../../shared/customerValidationSchema/customerValidationSchema';
import { Form } from '../CustomerMode/shared/customerTypes';
import { Invoice } from '../../../../contexts/data/data.models';

export function calculateInvoiceNumber(invoices: Invoice[]): string {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const newInvoiceNumber = invoices.filter(({ saleDate }) => saleDate.getMonth() + 1 === currentMonth).length + 1;
  return `${newInvoiceNumber}/${currentMonth}/${date.getFullYear()}`;
}

export interface BasicDataForm {
  number: string;
  saleDate: Date;
  issueDate: Date;
}

export interface ProductForm {
  name: string;
  quantity: string;
  netPrice: string;
  VATRate: string;
  grossAmount: string;
}

export interface ProductsForm {
  products: ProductForm[];
}

export interface CustomerForm extends Form {
  id?: string;
}

export interface DetailsForm {
  status: string | undefined;
  partlyPaid: string | undefined;
  paymentDeadline: Date | undefined;
  comments: string | undefined;
  isStatus: boolean;
  isPartlyPaid: boolean;
  isPaymentDeadline: boolean;
  areComments: boolean;
}

export type useDialogFormType = {
  basicDataForm: UseFormMethods<BasicDataForm>;
  customerForm: UseFormMethods<CustomerForm>;
  productsForm: UseFormMethods<ProductsForm>;
  detailsForm: UseFormMethods<DetailsForm>;
};

const useDialogForm = (): useDialogFormType => {
  const { invoices } = useData();
  const basicDataForm = useForm<BasicDataForm>({
    defaultValues: {
      number: calculateInvoiceNumber(invoices),
      saleDate: new Date(),
      issueDate: new Date()
    },
    shouldUnregister: false,
    resolver: yupResolver(basicDataValidationSchema)
  });
  const customerForm = useForm<CustomerForm>({
    resolver: yupResolver(customerValidationSchema),
    defaultValues: {
      mailingList: [{ value: '' }]
    },
    shouldUnregister: false
  });
  const productsForm = useForm<ProductsForm>({
    defaultValues: {
      products: [{ name: '', quantity: '0', netPrice: '0', VATRate: '23', grossAmount: '0' }]
    },
    shouldUnregister: false
  });
  const detailsForm = useForm<DetailsForm>({
    defaultValues: {
      paymentDeadline: new Date(),
      isStatus: false,
      isPartlyPaid: false,
      isPaymentDeadline: false,
      areComments: false
    },
    shouldUnregister: false
  });

  return { basicDataForm, customerForm, productsForm, detailsForm };
};

export default useDialogForm;
