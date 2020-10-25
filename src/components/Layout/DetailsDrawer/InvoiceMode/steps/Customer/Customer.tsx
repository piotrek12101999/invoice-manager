import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import isEqual from 'lodash.isequal';
import { Customer as CustomerData } from '../../../../../../contexts/data/data.models';
import Form from './Form';
import useData from '../../../../../../contexts/data/useData/useData';
import { StepComponent } from '../step-component.model';
import { CustomerForm } from '../../useDialogForm';
import Dialog from './Dialog/Dialog';

export interface CustomerDialog {
  open: boolean;
  variant: 'edit' | 'new' | null;
}

const Customer: React.FC<StepComponent<CustomerForm>> = ({ setStep, form }) => {
  const { customers } = useData();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [customerDialog, setCustomerDialog] = useState<CustomerDialog>({ open: false, variant: null });
  const { register, handleSubmit, control, reset, errors } = form;
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'mailingList'
  });

  const handleBackStep = () => setStep((prevStep) => --prevStep);

  const handleNextStep = (data: CustomerForm) => {
    const transformedCustomer = { ...data, mailingList: data.mailingList.map(({ value }) => value) };
    if (selectedCustomer) {
      if (!isEqual(selectedCustomer, transformedCustomer)) {
        setCustomerDialog({ open: true, variant: 'edit' });
      } else {
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
        control={control}
        register={register}
        handleNextStep={handleSubmit(handleNextStep)}
        handleBackStep={handleBackStep}
        fields={fields}
        errors={errors}
      />
      <Dialog
        customerDialog={customerDialog}
        setCustomerDialog={setCustomerDialog}
        setStep={setStep}
        control={control}
        originalName={`${selectedCustomer?.name}`}
      />
    </>
  );
};

export default Customer;
