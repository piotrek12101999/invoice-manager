import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Input from '../../../../../shared/Input/Input';
import { Checkbox, Button, FormControlLabel } from '@material-ui/core';
import DatePicker from '../../../../../shared/DatePicker/DatePicker';
import { StepComponent } from '../step-component.model';
import { DetailsForm } from '../../useDialogForm';
import { ArrowRightAltRounded } from '@material-ui/icons';

interface IncludedFields {
  status: boolean;
  partlyPaid: boolean;
  paymentDeadline: boolean;
  comments: boolean;
}

const Details: React.FC<StepComponent<DetailsForm>> = ({ setStep, form }) => {
  const [{ status, partlyPaid, paymentDeadline, comments }, setFields] = useState<IncludedFields>({
    status: false,
    partlyPaid: false,
    paymentDeadline: false,
    comments: false
  });
  const { register, control, handleSubmit, getValues } = form;

  const handleCheckboxChange = ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) =>
    setFields((fields) => ({ ...fields, [name]: checked }));

  const handleBack = () => setStep((prevStep) => --prevStep);

  const onSubmit = () => setStep((prevStep) => ++prevStep);

  return (
    <form className="details-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControlLabel
        control={<Checkbox color="primary" name="status" checked={status} onChange={handleCheckboxChange} />}
        label="Add status remarks?"
      />
      <Input name="status" label="Status" register={register} disabled={!status} />
      <FormControlLabel
        control={<Checkbox color="primary" name="partlyPaid" checked={partlyPaid} onChange={handleCheckboxChange} />}
        label="Is invoice partly paid??"
      />
      <Input name="partlyPaid" step={0.01} label="Partly paid" register={register} disabled={!partlyPaid} type="number" />
      <FormControlLabel
        control={<Checkbox color="primary" name="paymentDeadline" checked={paymentDeadline} onChange={handleCheckboxChange} />}
        label="Add payment deadline?"
      />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().paymentDeadline || new Date()} onChange={() => {}} disabled={!paymentDeadline} />}
        control={control}
        name="paymentDeadline"
        label="Payment deadline"
      />
      <FormControlLabel
        className="top-margin"
        control={<Checkbox color="primary" name="comments" checked={comments} onChange={handleCheckboxChange} />}
        label="Add comments?"
      />
      <Input name="comments" label="Comments" multiline rows={4} register={register} disabled={!comments} />
      <div className="buttons">
        <Button color="primary" onClick={handleBack}>
          Back
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Proceed <ArrowRightAltRounded />
        </Button>
      </div>
    </form>
  );
};

export default Details;
