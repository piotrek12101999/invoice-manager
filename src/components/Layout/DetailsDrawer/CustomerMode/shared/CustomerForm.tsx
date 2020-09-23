import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { DeepMap, FieldError, ArrayField } from 'react-hook-form';
import Input from './Input';
import { Form } from './customerTypes';

interface Props {
  handleSubmit: () => void;
  register: any;
  onCancel: () => void;
  errors: DeepMap<Form, FieldError>;
  fields: Partial<ArrayField<Record<string, any>, 'id'>>[];
  append: (value: Partial<Record<string, any>> | Partial<Record<string, any>>[], shouldFocus?: boolean | undefined) => void;
  remove: (index?: number | number[] | undefined) => void;
  isLoading?: boolean;
}

const CustomerForm: React.FC<Props> = ({ handleSubmit, register, onCancel, errors, fields, remove, append, isLoading }) => {
  const appendField = () => append({ value: '' });

  const handleRemove = (index: number) => () => remove(index);

  return (
    <form onSubmit={handleSubmit}>
      <Input label="NIP" name="NIP" register={register} error={errors.NIP?.message} required />
      <Input label="REGON" name="REGON" register={register} error={errors.REGON?.message} />
      <Input label="Name" name="name" register={register} error={errors.name?.message} required />
      <Input label="Street" name="street" register={register} error={errors.street?.message} required />
      <Input label="City" name="city" register={register} error={errors.city?.message} required />
      <Input label="Postal code" name="postalCode" register={register} error={errors.postalCode?.message} required />
      {fields.map((item, index) => (
        <Input
          key={index}
          label="Mail"
          name={`mailingList[${index}].value`}
          register={register}
          defaultValue={item.value}
          error={errors.mailingList && errors.mailingList[index]?.value?.message}
          isMailingList
          handleApend={appendField}
          handleRemove={handleRemove(index)}
          isFirstArrayElement={index === 0}
          required
        />
      ))}
      <div className="buttons">
        <Button className="button" color="primary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button className="button" variant="contained" color="primary" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} className="progress" /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
