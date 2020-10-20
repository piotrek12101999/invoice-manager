import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Invoice, InvoiceForm } from '../../../../../contexts/data/data.models';
import useData from '../../../../../contexts/data/useData/useData';
import DatePicker from '../../../../shared/DatePicker/DatePicker';
import Input from '../../../../shared/Input/Input';
import validationSchema from './validationSchema';

function calculateInvoiceNumber(invoices: Invoice[]): string {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const newInvoiceNumber = invoices.filter(({ saleDate }) => saleDate.getMonth() + 1 === currentMonth).length + 1;
  return `${newInvoiceNumber}/${currentMonth}/${date.getFullYear()}`;
}

interface Form {
  number: string;
  saleDate: Date;
  issueDate: Date;
}

interface Props {
  setData: Dispatch<SetStateAction<InvoiceForm>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const BasicData: React.FC<Props> = ({ setData, setStep }) => {
  const { invoices } = useData();
  const { register, control, handleSubmit, getValues, errors } = useForm<Form>({
    defaultValues: {
      number: calculateInvoiceNumber(invoices),
      saleDate: new Date(),
      issueDate: new Date()
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: Form) => {
    setData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => ++prevStep);
  };

  return (
    <form className="basic-data" onSubmit={handleSubmit(onSubmit)}>
      <Input name="number" register={register} label="Invoice number" error={errors.number?.message} required />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().saleDate} onChange={() => {}} required />}
        control={control}
        name="saleDate"
        label="Sale date"
      />
      <br />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().issueDate} onChange={() => {}} required />}
        control={control}
        name="issueDate"
        label="Issue date"
      />
      <Button
        className="button"
        type="submit"
        color="primary"
        variant="contained"
        disabled={Boolean(errors.number || errors.issueDate || errors.saleDate)}
      >
        Proceed to next step <ArrowRightAltRounded />
      </Button>
    </form>
  );
};

export default BasicData;
