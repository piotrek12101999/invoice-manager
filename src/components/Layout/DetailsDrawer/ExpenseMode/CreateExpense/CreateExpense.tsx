import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore, storage } from '../../../../..';
import useData from '../../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';
import Form, { FormFields } from '../shared/Form';
import { expensesCollection } from '../../../../../contexts/data/collections';

interface Props {
  handleClose: () => void;
}

const CreateExpense: React.FC<Props> = ({ handleClose }) => {
  const {
    user: { email }
  } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      purchaseDate: new Date()
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
      const document = await firestore.collection(expensesCollection(email)).add({
        ...data,
        price: parseFloat(price)
      });

      if (file) {
        const path = storage.child(`${email}/expenses/${document.id}`);
        await path.put(file);

        await document.update({ file: { name: file.name, size: file.size } });
      }

      enqueueSnackbar('Expense added', { variant: 'info' });
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
        setFile={setFile}
        closeDrawer={closeDrawer}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateExpense;
