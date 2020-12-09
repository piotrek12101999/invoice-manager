import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { DeepMap, FieldError } from 'react-hook-form';
import Input from '../../../../shared/Input/Input';
import { Form } from './customerTypes';

interface Props {
  handleSubmit: () => void;
  register: any;
  onCancel: () => void;
  errors: DeepMap<Form, FieldError>;
  isLoading?: boolean;
}

const CustomerForm: React.FC<Props> = ({ handleSubmit, register, onCancel, errors, isLoading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input label="NIP" name="NIP" register={register} error={errors.NIP?.message} required />
      <Input label="REGON" name="REGON" register={register} error={errors.REGON?.message} />
      <Input label="Name" name="name" register={register} error={errors.name?.message} required />
      <Input label="Street" name="street" register={register} error={errors.street?.message} required />
      <Input label="City" name="city" register={register} error={errors.city?.message} required />
      <Input label="Postal code" name="postalCode" register={register} error={errors.postalCode?.message} required />
      <Input label="Email" name="mail" type="mail" register={register} error={errors.mail?.message} />
      <div className="buttons">
        <Button className="button-customer" color="primary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button className="button-customer" variant="contained" color="primary" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} className="progress" /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
