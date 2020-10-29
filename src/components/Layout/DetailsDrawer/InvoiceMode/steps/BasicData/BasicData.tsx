import React from 'react';
import { Button } from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';
import { Controller } from 'react-hook-form';
import DatePicker from '../../../../../shared/DatePicker/DatePicker';
import Input from '../../../../../shared/Input/Input';
import { StepComponent } from '../step-component.model';
import { BasicDataForm } from '../../useDialogForm';

const BasicData: React.FC<StepComponent<BasicDataForm>> = ({ setStep, form }) => {
  const { register, control, getValues, errors, handleSubmit } = form;

  const handleNextStep = () => setStep((prevStep) => ++prevStep);

  return (
    <form className="basic-data" onSubmit={handleSubmit(handleNextStep)}>
      <Input name="number" register={register} label="Invoice number" error={errors.number?.message} required />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().saleDate || new Date()} onChange={() => {}} required />}
        control={control}
        name="saleDate"
        label="Sale date"
      />
      <br />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().issueDate || new Date()} onChange={() => {}} required />}
        control={control}
        name="issueDate"
        label="Issue date"
      />
      <Button className="button" color="primary" variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
        Proceed to next step <ArrowRightAltRounded />
      </Button>
    </form>
  );
};

export default BasicData;
