import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore, storage } from '../../../../..';
import useData from '../../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';
import Form, { FormFields } from '../shared/Form';

interface Props {
  handleClose: () => void;
  id: string;
}

const EditExpense: React.FC<Props> = ({ handleClose, id }) => {
  const {
    user: { email },
    expenses
  } = useData();
  const selectedExpense = expenses.find((expense) => expense.id === id);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      name: selectedExpense?.name,
      price: `${selectedExpense?.price}`,
      purchaseDate: selectedExpense?.purchaseDate
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  const closeDrawer = () => {
    if (!isLoading) {
      handleClose();
    }
  };

  const onSubmit = async ({ price, ...data }: FormFields) => {
    setLoading(true);
    try {
      firestore.doc(`${email}/expenses/expenes/${id}`).update({
        ...data,
        price: parseFloat(price)
      });

      if (file) {
        const path = storage.child(`${email}/expenses/${id}`);
        await path.put(file);

        await firestore.doc(`${email}/expenses/expenes/${id}`).update({ file: { name: file.name, size: file.size } });
      }

      enqueueSnackbar('Expense updated', { variant: 'info' });
    } catch (err) {
      enqueueSnackbar('Oooops, there was a problem', { variant: 'error' });
    } finally {
      setLoading(false);
      closeDrawer();
    }
  };

  return (
    <div className="expense">
      <p className="title"> New expense </p>
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        control={control}
        file={file}
        dbFile={selectedExpense?.file}
        setFile={setFile}
        closeDrawer={closeDrawer}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditExpense;
