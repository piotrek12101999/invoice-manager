import React, { useState } from 'react';
import { Dialog as MUIDialog } from '@material-ui/core';
import { CustomerDialog } from '../Customer';
import NewCustomer from './DialogVariants/NewCustomer';
import EditCustomer from './DialogVariants/EditCustomer';
import { CustomerForm } from '../../../useDialogForm';
import { Control } from 'react-hook-form';

interface Props {
  customerDialog: CustomerDialog;
  setCustomerDialog: React.Dispatch<React.SetStateAction<CustomerDialog>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  control: Control<CustomerForm>;
  originalName: string;
}

const Dialog: React.FC<Props> = ({ customerDialog, setCustomerDialog, setStep, control, originalName }) => {
  const [isLoading, setLoading] = useState(false);

  const toggleCustomerDialog = () => {
    if (!isLoading) {
      setCustomerDialog(({ open, variant }) => ({ open: !open, variant: open ? null : variant }));
    }
  };

  const renderDialogContent = () => {
    const sharedProps = {
      data: control.getValues(),
      setStep,
      toggleCustomerDialog,
      isLoading,
      setLoading
    };

    switch (customerDialog.variant) {
      case 'new':
        return <NewCustomer {...sharedProps} />;
      case 'edit':
        return <EditCustomer {...sharedProps} originalName={originalName} />;
    }
  };

  return (
    <MUIDialog open={customerDialog.open} onClose={toggleCustomerDialog}>
      {renderDialogContent()}
    </MUIDialog>
  );
};

export default Dialog;
