import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';
import { firestore, storage } from '../../../../..';
import useData from '../../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';
import Form, { FormFields } from '../shared/Form';
import Menu from './Menu';
import { expensesCollection } from '../../../../../contexts/data/collections';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const onSubmit = async ({ price, ...data }: FormFields) => {
    setLoading(true);
    try {
      firestore.doc(`${expensesCollection(email)}/${id}`).update({
        ...data,
        price: parseFloat(price)
      });

      if (file) {
        const path = storage.child(`${email}/expenses/${id}`);
        await path.put(file);

        await firestore.doc(`${expensesCollection(email)}/${id}`).update({ file: { name: file.name, size: file.size } });
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
    <>
      <div className="expense edit">
        <div className="top-nav">
          <p className="title"> Edit expense </p>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertRounded />
          </IconButton>
        </div>
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
      <Menu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        disabled={!Boolean(selectedExpense?.file)}
        id={id}
        email={email}
        closeDrawer={closeDrawer}
      />
    </>
  );
};

export default EditExpense;
