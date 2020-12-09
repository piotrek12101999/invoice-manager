import React, { useState } from 'react';
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

  const handleBackStep = () => setStep((prevStep) => --prevStep);

  const handleNextStep = (data: CustomerForm) => {
    if (selectedCustomer) {
      if (!isEqual(selectedCustomer, data)) {
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
        reset={reset}
        control={control}
        register={register}
        handleNextStep={handleSubmit(handleNextStep)}
        handleBackStep={handleBackStep}
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
