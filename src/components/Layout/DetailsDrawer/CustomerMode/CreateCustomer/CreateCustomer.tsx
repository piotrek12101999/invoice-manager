import React from 'react';
import CustomerForm from '../shared/CustomerForm';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import validationSchema from '../../../../shared/customerValidationSchema/customerValidationSchema';
import { firestore } from '../../../../..';
import useData from '../../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';
import { Form } from '../shared/customerTypes';

interface Props {
  handleClose: () => void;
}

const CreateCustomer: React.FC<Props> = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    user: { email }
  } = useData();
  const { register, handleSubmit, errors, control } = useForm<Form>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      mailingList: [{ value: '' }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mailingList'
  });

  const onSubmit = async ({ NIP, REGON, name, city, street, postalCode, mailingList }: Form) => {
    try {
      await firestore.collection(`${email}/customers/customers`).add({
        NIP,
        name,
        city,
        street,
        postalCode,
        ...(REGON && { REGON }),
        mailingList: mailingList.map((item) => item.value)
      });
      enqueueSnackbar('Customer added', { variant: 'info' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error while adding customer', { variant: 'error' });
    } finally {
      handleClose();
    }
  };

  return (
    <div className="customer new">
      <p className="title"> New Customer </p>
      <CustomerForm
        handleSubmit={handleSubmit(onSubmit)}
        onCancel={handleClose}
        register={register}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />
    </div>
  );
};

export default CreateCustomer;
