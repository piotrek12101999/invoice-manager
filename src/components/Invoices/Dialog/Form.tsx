import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Customer } from '../../../contexts/data/data.models';
import Input from './Input';
import { Form as CustomerForm } from '../../Layout/DetailsDrawer/CustomerMode/shared/customerTypes';
import { AddRounded } from '@material-ui/icons';

const Form: React.FC<any> = ({ customers, selectedCustomer, onSubmit, setSelectedCustomer }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm<CustomerForm>({
    defaultValues: {
      mailingList: [{ value: '' }]
    }
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'mailingList'
  });

  const handleRemove = (index: number) => () => remove(index);

  const handleAppend = () => append({ value: '' });

  const handleOptionSelect = (_: any, option: Customer | string | null) => {
    if (option && typeof option === 'object') {
      setSelectedCustomer(option);
      reset({ ...option, mailingList: option.mailingList.map((mail: string) => ({ value: mail })) });
    } else {
      reset({
        name: '',
        NIP: '',
        street: '',
        postalCode: '',
        city: '',
        mailingList: [{ value: '' }]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        freeSolo
        options={customers}
        // @ts-ignore
        getOptionLabel={(option) => option.name}
        // @ts-ignore
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input"
            name="name"
            inputRef={register()}
            size="small"
            variant="outlined"
            type="text"
            label="Name"
          />
        )}
      />
      <Input control={control} name="NIP" label="NIP" />
      <Input control={control} name="street" label="Street" />
      <Input control={control} name="postalCode" label="Postal Code" />
      <Input control={control} name="city" label="City" />
      {fields.map((item, index) =>
        index === 0 ? (
          <TextField
            key={index}
            className="input"
            name={`mailingList[${index}].value`}
            value={item.value}
            inputRef={register()}
            size="small"
            variant="outlined"
            type="text"
            label="Mail"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAppend}>
                    <AddRounded />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ) : (
          <Input
            key={index}
            name={`mailingList[${index}].value`}
            control={control}
            label="Mail"
            defaultValue={item.value}
            handleAppend={handleAppend}
            handleRemove={handleRemove(index)}
            isMailingList
          />
        )
      )}
      <Button color="primary" variant="contained" type="submit">
        Next
      </Button>
    </form>
  );
};

export default Form;
