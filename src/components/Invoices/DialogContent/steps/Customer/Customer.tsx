import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Customer as CustomerData, InvoiceForm } from '../../../../../contexts/data/data.models';
import { Form as CustomerForm } from '../../../../Layout/DetailsDrawer/CustomerMode/shared/customerTypes';
import Form from './Form';
import useData from '../../../../../contexts/data/useData/useData';
import { yupResolver } from '@hookform/resolvers';
import customerValidationSchema from '../../../../shared/customerValidationSchema/customerValidationSchema';
import { Dialog } from '@material-ui/core';

interface Props {
  setData: React.Dispatch<React.SetStateAction<InvoiceForm>>;
}

const Customer: React.FC<Props> = ({ setData }) => {
  const { customers } = useData();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, reset, errors } = useForm<CustomerForm>({
    resolver: yupResolver(customerValidationSchema),
    defaultValues: {
      mailingList: [{ value: '' }]
    }
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'mailingList'
  });

  const onSubmit = (values: CustomerForm) => {
    setOpen(true);
    if (selectedCustomer) {
    } else {
    }
    setData((prevData) => ({ ...prevData, customer: { ...values, mailingList: values.mailingList.map(({ value }) => value) } }));
  };

  return (
    <>
      <Form
        customers={customers}
        setSelectedCustomer={setSelectedCustomer}
        remove={remove}
        append={append}
        reset={reset}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        register={register}
        fields={fields}
        errors={errors}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        Test
      </Dialog>
    </>
  );
};

export default Customer;
