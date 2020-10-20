import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import isEqual from 'lodash.isequal';
import { Customer as CustomerData, InvoiceForm } from '../../../../../contexts/data/data.models';
import { Form as CustomerForm } from '../../../../Layout/DetailsDrawer/CustomerMode/shared/customerTypes';
import Form from './Form';
import useData from '../../../../../contexts/data/useData/useData';
import customerValidationSchema from '../../../../shared/customerValidationSchema/customerValidationSchema';
import { Dialog } from '@material-ui/core';

interface Props {
  setData: React.Dispatch<React.SetStateAction<InvoiceForm>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface CustomerDialog {
  open: boolean;
  variant: 'edit' | 'new' | null;
}

const Customer: React.FC<Props> = ({ setData, setStep }) => {
  const { customers } = useData();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [customerDialog, setCustomerDialog] = useState<CustomerDialog>({ open: false, variant: null });
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

  const handleBackStep = () => setStep((prevStep) => --prevStep);

  const toggleCustomerDialog = () => setCustomerDialog(({ open, variant }) => ({ open: !open, variant: open ? null : variant }));

  const onSubmit = (data: CustomerForm) => {
    const transformedCustomer = { ...data, mailingList: data.mailingList.map(({ value }) => value) };
    if (selectedCustomer) {
      const { id, ...customerWithoutID } = selectedCustomer;
      if (!isEqual(customerWithoutID, transformedCustomer)) {
        setCustomerDialog({ open: true, variant: 'edit' });
      } else {
        setData((prevData) => ({ ...prevData, customer: { ...data, mailingList: data.mailingList.map(({ value }) => value) } }));
        setStep((prevStep) => ++prevStep);
      }
    } else {
      setCustomerDialog({ open: true, variant: 'new' });
    }
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
        handleBackStep={handleBackStep}
        fields={fields}
        errors={errors}
      />
      <Dialog open={customerDialog.open} onClose={toggleCustomerDialog}>
        Test
      </Dialog>
    </>
  );
};

export default Customer;
