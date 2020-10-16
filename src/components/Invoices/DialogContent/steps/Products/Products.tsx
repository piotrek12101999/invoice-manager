import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from '../../../../shared/Input/Input';
import { InvoiceForm, Product } from '../../../../../contexts/data/data.models';
import { QuantityInput, NetPriceInput, VATRateInput, GrossAmoutInput } from './Inputs';

interface Props {
  setData: React.Dispatch<React.SetStateAction<InvoiceForm>>;
}

export interface Form {
  products: Product[];
}

const Products: React.FC<Props> = () => {
  const { register, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      products: [{ name: '', quantity: 0, netPrice: 0, VATRate: 23, grossAmount: 0 }]
    }
  });
  const { fields, append } = useFieldArray({
    name: 'products',
    control
  });

  const handleAppend = () => append({ name: '', quantity: 0, netPrice: 0, VATRate: 23, grossAmount: 0 });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map(({ id, name, quantity, netPrice, VATRate, grossAmount }, index) => {
        return (
          <div key={id}>
            <Input register={register} label="Name" name={`products[${index}].name`} defaultValue={name} />
            <QuantityInput control={control} defaultValue={quantity} index={index} register={register} />
            <NetPriceInput control={control} defaultValue={netPrice} index={index} register={register} />
            <VATRateInput control={control} defaultValue={VATRate} index={index} />
            <GrossAmoutInput control={control} defaultValue={grossAmount} index={index} register={register} />
          </div>
        );
      })}
      <button type="button" onClick={handleAppend}>
        Appends
      </button>
    </form>
  );
};

export default Products;
