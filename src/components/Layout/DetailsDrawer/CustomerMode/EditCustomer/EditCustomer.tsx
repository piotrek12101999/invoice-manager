import React, { useState } from 'react';
import useData from '../../../../../contexts/data/useData/useData';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import validationSchema from '../../../../shared/customerValidationSchema/customerValidationSchema';
import { Form } from '../shared/customerTypes';
import CustomerForm from '../shared/CustomerForm';
import { firestore } from '../../../../..';
import { useSnackbar } from 'notistack';
import { firestore as staticFirestore } from 'firebase/app';
import Avatar from '../../../../shared/Avatar/Avatar';
import { Button } from '@material-ui/core';
import Dialog from './Dialog/Dialog';

interface Props {
  id: string;
  handleClose: () => void;
}

const EditCustomer: React.FC<Props> = ({ handleClose, id }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    customers,
    user: { email }
  } = useData();
  const selectedCustomer = customers.find((customer) => customer.id === id);
  const { register, handleSubmit, errors, control } = useForm<Form>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...selectedCustomer,
      mailingList: selectedCustomer?.mailingList.map((mail) => ({ value: mail }))
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mailingList'
  });
  const toggleDialog = () => setDialogOpen((prevValue) => !prevValue);

  const onSubmit = async (data: Form) => {
    setLoading(true);
    const { mailingList, REGON } = data;

    try {
      await firestore.doc(`${email}/customers/customers/${id}`).update({
        ...data,
        ...(REGON ? { REGON } : { REGON: staticFirestore.FieldValue.delete() }),
        mailingList: mailingList.map((item) => item.value)
      });
      enqueueSnackbar('Customer edited', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <div className="customer edit">
        <div className="top-nav">
          <p className="title"> Edit Customer </p>
          <Button onClick={toggleDialog}> Delete </Button>
        </div>
        <Avatar className="avatar" size="large" text={`${selectedCustomer?.name}`} />
        <p className="name"> {selectedCustomer?.name} </p>
        <hr />
        <CustomerForm
          handleSubmit={handleSubmit(onSubmit)}
          onCancel={handleClose}
          register={register}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
          isLoading={isLoading}
        />
      </div>
      <Dialog
        name={`${selectedCustomer?.name}`}
        id={`${selectedCustomer?.id}`}
        handleClose={handleClose}
        toggleDialog={toggleDialog}
        isDialogOpen={isDialogOpen}
        email={email}
      />
    </>
  );
};

export default EditCustomer;
