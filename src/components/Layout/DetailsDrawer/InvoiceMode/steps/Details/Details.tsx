import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Input from '../../../../../shared/Input/Input';
import { Checkbox, Button, FormControlLabel } from '@material-ui/core';
import DatePicker from '../../../../../shared/DatePicker/DatePicker';
import { StepComponent } from '../step-component.model';
import { DetailsForm } from '../../useDialogForm';
import { ArrowRightAltRounded } from '@material-ui/icons';

const Details: React.FC<StepComponent<DetailsForm>> = ({ setStep, form }) => {
  const { register, control, handleSubmit, getValues } = form;
  const { isStatus, isPartlyPaid, isPaymentDeadline, areComments } = useWatch({
    control
  });

  const handleBack = () => setStep((prevStep) => --prevStep);

  const onSubmit = () => setStep((prevStep) => ++prevStep);

  return (
    <form className="details-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControlLabel control={<Checkbox color="primary" name="isStatus" inputRef={register()} />} label="Add status remarks?" />
      <Input name="status" label="Status" register={register} disabled={!isStatus} />
      <FormControlLabel control={<Checkbox color="primary" name="isPartlyPaid" inputRef={register()} />} label="Is invoice partly paid??" />
      <Input name="partlyPaid" step={0.01} label="Partly paid" register={register} disabled={!isPartlyPaid} type="number" />
      <FormControlLabel
        control={<Checkbox color="primary" name="isPaymentDeadline" inputRef={register()} />}
        label="Add payment deadline?"
      />
      <Controller
        // @ts-ignore Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().paymentDeadline || new Date()} onChange={() => {}} disabled={!isPaymentDeadline} />}
        control={control}
        name="paymentDeadline"
        label="Payment deadline"
      />
      <FormControlLabel
        className="top-margin"
        control={<Checkbox color="primary" name="areComments" inputRef={register()} />}
        label="Add comments?"
      />
      <Input name="comments" label="Comments" multiline rows={4} register={register} disabled={!areComments} />
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
