import React from 'react';
import { Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Input from '../../../../shared/Input/Input';
import { Customer } from '../../../../../contexts/data/data.models';
import { Control, FieldError, DeepMap } from 'react-hook-form';
import { CustomerForm } from '../../useDialogForm';
import { ArrowRightAltRounded } from '@material-ui/icons';

interface Props {
  handleBackStep: () => void;
  customers: Customer[];
  fields: any[];
  remove: (index?: number | number[] | undefined) => void;
  append: (value: Partial<Record<string, any>> | Partial<Record<string, any>>[], shouldFocus?: boolean | undefined) => void;
  reset: (values: any) => void;
  handleNextStep: () => void;
  control: Control<CustomerForm>;
  register: any;
  errors: DeepMap<CustomerForm, FieldError>;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const Form: React.FC<Props> = ({
  customers,
  remove,
  append,
  control,
  register,
  setSelectedCustomer,
  handleNextStep,
  reset,
  fields,
  errors,
  handleBackStep
}) => {
  const handleRemove = (index: number) => () => remove(index);

  const handleAppend = () => append({ value: '' });

  const handleOptionSelect = (_: any, option: Customer | string | null) => {
    if (option && typeof option === 'object') {
      setSelectedCustomer(option);
      reset({ ...option, mailingList: option.mailingList.map((mail: string) => ({ value: mail })) });
    } else {
      setSelectedCustomer(null);
      reset({
        name: '',
        NIP: '',
        REGON: '',
        street: '',
        postalCode: '',
        city: '',
        mailingList: [{ value: '' }]
      });
    }
  };

  const renderLabel = (option: Customer | string) => {
    if (option && typeof option === 'object') {
      return option.name;
    }

    return '';
  };

  const handleFirstMailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arrayWithoutFirstField = fields.filter((_, index) => index !== 0);

    reset({
      ...control.getValues(),
      mailingList: [{ value: event.currentTarget.value }, ...arrayWithoutFirstField.map(({ value }) => ({ value }))]
    });
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
      {fields.map((item, index) =>
        index === 0 ? (
          <Input
            key={index}
            name="mailingList[0].value"
            value={item?.value}
            onChange={handleFirstMailInputChange}
            register={register}
            type="mail"
            label="Mail"
            isFirstArrayElement
            handleAppend={handleAppend}
            isMailingList
            error={errors.mailingList && errors.mailingList[0]?.value?.message}
            required
          />
        ) : (
          <Input
            key={index}
            control={control}
            isController
            name={`mailingList[${index}].value`}
            label="Mail"
            type="mail"
            isMailingList
            defaultValue={item?.value}
            handleAppend={handleAppend}
            error={errors.mailingList && errors.mailingList[index]?.value?.message}
            handleRemove={handleRemove(index)}
          />
        )
      )}
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
