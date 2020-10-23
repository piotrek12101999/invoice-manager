import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Input from '../../../../shared/Input/Input';
import { QuantityInput, NetPriceInput, VATRateInput, GrossAmoutInput } from './Inputs';
import { StepComponent } from '../step-component.model';
import { ProductsForm } from '../../useDialogForm';

const Products: React.FC<StepComponent<ProductsForm>> = ({ setStep, form }) => {
  const { register, control, handleSubmit } = form;
  const { fields, append } = useFieldArray({
    name: 'products',
    control
  });

  const handleAppend = () => append({ name: '', quantity: 0, netPrice: 0, VATRate: 23, grossAmount: 0 });

  const handleNextStep = () => setStep((prevValue) => ++prevValue);

  return (
    <form onSubmit={handleSubmit(handleNextStep)}>
      {fields.map(({ id, name, quantity, netPrice, VATRate, grossAmount }, index) => {
        return (
          <div key={id}>
            <Input register={register} label="Name" name={`products[${index}].name`} defaultValue={name} />
            <QuantityInput control={control} defaultValue={quantity} index={index} register={register} />
            <NetPriceInput control={control} defaultValue={netPrice} index={index} register={register} />
            <VATRateInput control={control} defaultValue={VATRate} index={index} />
            <br />
            <br />
            <GrossAmoutInput control={control} defaultValue={grossAmount} index={index} register={register} />
          </div>
        );
      })}
      <button type="button" onClick={handleAppend}>
        Appends
      </button>
      <button type="submit"> submit </button>
    </form>
  );
};

export default Products;
