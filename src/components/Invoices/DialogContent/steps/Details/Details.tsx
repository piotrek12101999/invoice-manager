import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../../../shared/Input/Input';
import { Switch, Checkbox, Button } from '@material-ui/core';
import DatePicker from '../../../../shared/DatePicker/DatePicker';

const Details: React.FC = () => {
  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      paymentDeadline: new Date()
    }
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Switch name="isStatus" color="primary" inputRef={register()} />
      <Input name="status" label="status" register={register} disabled />
      <div>
        Partly paid
        <Checkbox color="primary" name="partlyPaid" inputRef={register()} />
      </div>
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={getValues().paymentDeadline} onChange={() => {}} />}
        control={control}
        name="paymentDeadline"
        label="Payment deadline"
      />
      <Switch name="areComments" color="primary" inputRef={register()} />
      <Input name="comments" label="comments" register={register} />
      <Button color="primary" variant="contained" type="submit">
        submit
      </Button>
    </form>
  );
};

export default Details;
