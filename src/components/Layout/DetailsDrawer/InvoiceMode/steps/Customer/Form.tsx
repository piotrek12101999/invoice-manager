import React from 'react';
import { Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Input from '../../../../../shared/Input/Input';
import { Customer } from '../../../../../../contexts/data/data.models';
import { Control, FieldError, DeepMap } from 'react-hook-form';
import { CustomerForm } from '../../useDialogForm';
import { ArrowRightAltRounded } from '@material-ui/icons';

interface Props {
  handleBackStep: () => void;
  customers: Customer[];
  reset: (values: any) => void;
  handleNextStep: () => void;
  control: Control<CustomerForm>;
  register: any;
  errors: DeepMap<CustomerForm, FieldError>;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const Form: React.FC<Props> = ({ customers, control, register, setSelectedCustomer, handleNextStep, reset, errors, handleBackStep }) => {
  const handleOptionSelect = (_: any, option: Customer | string | null) => {
    if (option && typeof option === 'object') {
      setSelectedCustomer(option);
      reset(option);
    } else {
      setSelectedCustomer(null);
      reset({
        name: '',
        NIP: '',
        REGON: '',
        street: '',
        postalCode: '',
        city: '',
        mail: ''
      });
    }
  };

  const renderLabel = (option: Customer | string) => {
    if (option && typeof option === 'object') {
      return option.name;
    }

    return '';
  };

  return (
    <form className="customer-form" onSubmit={handleNextStep}>
      <Autocomplete
        freeSolo
        options={customers}
        getOptionLabel={renderLabel}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <Input
            register={register}
            name="name"
            label="Name"
            error={errors.name?.message}
            isAutoComplete
            autoCompleteProps={params}
            required
          />
        )}
      />
      <Input control={control} isController error={errors.NIP?.message} name="NIP" label="NIP" required />
      <Input control={control} isController error={errors.REGON?.message} name="REGON" label="REGON" />
      <Input control={control} isController error={errors.street?.message} name="street" label="Street" required />
      <Input control={control} isController error={errors.postalCode?.message} name="postalCode" label="Postal Code" required />
      <Input control={control} isController error={errors.city?.message} name="city" label="City" required />
      <Input control={control} isController error={errors.mail?.message} name="mail" type="mail" label="Email" />
      <div className="buttons">
        <Button color="primary" type="button" onClick={handleBackStep}>
          Back
        </Button>
        <Button color="primary" variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
          Proceed <ArrowRightAltRounded />
        </Button>
      </div>
    </form>
  );
};

export default Form;
