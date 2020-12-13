import React from 'react';
import CustomerForm from '../shared/CustomerForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import validationSchema from '../../../../shared/customerValidationSchema/customerValidationSchema';
import { firestore } from '../../../../..';
import useData from '../../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';
import { Form } from '../shared/customerTypes';
import { customersCollection } from '../../../../../contexts/data/collections';

interface Props {
  handleClose: () => void;
}

const CreateCustomer: React.FC<Props> = ({ handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    user: { email }
  } = useData();
  const { register, handleSubmit, errors } = useForm<Form>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async ({ mail, REGON, ...customer }: Form) => {
    try {
      await firestore.collection(customersCollection(email)).add({
        ...customer,
        ...(REGON && { REGON }),
        ...(mail && { mail })
      });
      enqueueSnackbar('Customer added', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('Error while adding customer', { variant: 'error' });
    } finally {
      handleClose();
    }
  };

  return (
    <div className="customer new">
      <p className="title"> New Customer </p>
      <CustomerForm handleSubmit={handleSubmit(onSubmit)} onCancel={handleClose} register={register} errors={errors} />
    </div>
  );
};

export default CreateCustomer;
