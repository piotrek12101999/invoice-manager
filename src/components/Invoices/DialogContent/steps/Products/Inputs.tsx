import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Control, useWatch, Controller } from 'react-hook-form';
import { calculateGrossAmount, calculateNetPrice } from './utils';
import Input from '../../../../shared/Input/Input';
import { ProductsForm } from '../../useDialogForm';

interface VATRateProps {
  control: Control<ProductsForm>;
  defaultValue: string;
  index: number;
}

interface Props extends VATRateProps {
  register: any;
}

const VATOptions = [0, 3, 4, 5, 5.5, 6.5, 7, 7.7, 8, 8.5, 9, 9.5, 10, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 27];

export const VATRateInput: React.FC<VATRateProps> = ({ control, defaultValue, index }) => {
  const value = useWatch({
    control,
    name: `products[${index}].VATRate`
  });

  const values = control.getValues();

  if (values.products) {
    if (values.products[index]) {
      const { quantity, netPrice } = values.products[index];

      const currentValues = control.getValues().products;
      currentValues[index].grossAmount = calculateGrossAmount(`${quantity}`, `${netPrice}`, `${value}`);
      control.setValue('products', currentValues);
    }
  }

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel> VAT Rate </InputLabel>
      <Controller
        as={
          <Select MenuProps={{ style: { maxHeight: 350 } }}>
            {VATOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}%
              </MenuItem>
            ))}
          </Select>
        }
        name={`products[${index}].VATRate`}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export const QuantityInput: React.FC<Props> = ({ control, register, defaultValue, index }) => {
  const value = useWatch({
    control,
    name: `products[${index}].quantity`
  });

  const values = control.getValues();

  if (values.products) {
    if (values.products[index]) {
      const { VATRate, netPrice } = values.products[index];

      const currentValues = control.getValues().products;
      currentValues[index].grossAmount = calculateGrossAmount(`${value}`, `${netPrice}`, `${VATRate}`);
      control.setValue('products', currentValues);
    }
  }

  return <Input register={register} label="Quantity" type="number" name={`products[${index}].quantity`} defaultValue={defaultValue} />;
};

export const NetPriceInput: React.FC<Props> = ({ control, register, defaultValue, index }) => {
  const value = useWatch({
    control,
    name: `products[${index}].netPrice`
  });

  const values = control.getValues();

  if (values.products) {
    if (values.products[index]) {
      const { VATRate, quantity } = values.products[index];

      const currentValues = control.getValues().products;
      currentValues[index].grossAmount = calculateGrossAmount(`${quantity}`, `${value}`, `${VATRate}`);
      control.setValue('products', currentValues);
    }
  }

  return <Input register={register} label="Net price" name={`products[${index}].netPrice`} defaultValue={defaultValue} />;
};

export const GrossAmoutInput: React.FC<Props> = ({ control, register, defaultValue, index }) => {
  const value = useWatch({
    control,
    name: `products[${index}].grossAmount`
  });

  const values = control.getValues();

  if (values.products) {
    if (values.products[index]) {
      const { VATRate, quantity } = values.products[index];

      const currentValues = control.getValues().products;
      currentValues[index].netPrice = calculateNetPrice(`${quantity}`, `${value}`, `${VATRate}`);
      control.setValue('products', currentValues);
    }
  }

  return <Input register={register} label="Gross amount" name={`products[${index}].grossAmount`} defaultValue={defaultValue} />;
};
