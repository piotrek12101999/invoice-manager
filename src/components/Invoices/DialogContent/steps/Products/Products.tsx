import React from 'react';
import { InvoiceForm } from '../../../../../contexts/data/data.models';
import { useForm, useFieldArray } from 'react-hook-form';

interface Props {
  setData: React.Dispatch<React.SetStateAction<InvoiceForm>>;
}

const Products: React.FC<Props> = () => {
  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues: {
      mailingList: [{ value: '' }]
    }
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'products'
  });

  return <div>Products</div>;
};

export default Products;
