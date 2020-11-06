import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../../../../../shared/Input/Input';
import { QuantityInput, NetPriceInput, VATRateInput, GrossAmoutInput } from './Inputs';
import { StepComponent } from '../step-component.model';
import { ProductsForm } from '../../useDialogForm';
import { Button } from '@material-ui/core';
import { ArrowRightAltRounded } from '@material-ui/icons';

const Products: React.FC<StepComponent<ProductsForm>> = ({ setStep, form }) => {
  const { register, control, handleSubmit, reset } = form;
  const { fields, remove } = useFieldArray({
    name: 'products',
    control
  });

  const handleAppend = () => {
    // Using append method sets other inputs to 0, that's why reset is used here
    reset({
      products: [...control.getValues().products, { name: '', quantity: '0', netPrice: '0', VATRate: '23', grossAmount: '0' }]
    });
  };

  const handleRemove = (index: number) => () => remove(index);

  const handlePrevStep = () => {
    // Here we save step for useFieldArray handler
    reset(control.getValues());
    setStep((prevValue) => --prevValue);
  };

  const handleNextStep = (data: ProductsForm) => {
    // Here we save step for useFieldArray handler
    reset(data);
    setStep((prevValue) => ++prevValue);
  };

  return (
    <form className="products-form" onSubmit={handleSubmit(handleNextStep)}>
      {fields.map(({ id, name, quantity, netPrice, VATRate, grossAmount }, index) => {
        return (
          <div className="product-row" key={id}>
            <Input register={register} label="Name" fullWidth name={`products[${index}].name`} defaultValue={name} required />
            <QuantityInput control={control} defaultValue={quantity} index={index} register={register} />
            <NetPriceInput control={control} defaultValue={netPrice} index={index} register={register} />
            <VATRateInput control={control} defaultValue={VATRate} index={index} />
            <br />
            <br />
            <GrossAmoutInput control={control} defaultValue={grossAmount} index={index} register={register} />
            {index !== 0 && (
              <Button className="remove-button" type="button" color="secondary" variant="outlined" onClick={handleRemove(index)}>
                Remove
              </Button>
            )}
          </div>
        );
      })}
      <Button className="append-button" type="button" color="primary" variant="outlined" onClick={handleAppend}>
        Appends
      </Button>
      <div className="buttons">
        <Button type="button" color="primary" onClick={handlePrevStep}>
          Back
        </Button>
        <Button className="submit-button" type="submit" color="primary" variant="contained">
          Proceed <ArrowRightAltRounded />
        </Button>
      </div>
    </form>
  );
};

export default Products;
