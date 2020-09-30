import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Dialog as MUIDialog, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useData from '../../../contexts/data/useData/useData';
import { Customer } from '../../../contexts/data/data.models';
import Input from './Input';
import Form from './Form';

interface Props {
  open: boolean;
  onClose: () => void;
}

const steps = ['Select customer', 'Create an ad group', 'Create an ad'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const Dialog: React.FC<Props> = ({ open, onClose }) => {
  const { customers } = useData();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>({} as Customer);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <MUIDialog className="dialog-invoices" fullWidth open={open} onClose={onClose}>
      <div className="content">
        <p className="title"> 1. Select or create customer </p>
        <Form customers={customers} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} onSubmit={onSubmit} />
      </div>
    </MUIDialog>
  );
};

export default Dialog;
