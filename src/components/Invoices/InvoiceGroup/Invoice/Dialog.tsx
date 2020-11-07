import React from 'react';
import { Dialog as MUIDialog, Button } from '@material-ui/core';
import { firestore } from '../../../..';
import useData from '../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  toggleDialog: () => void;
  number: string;
  id: string;
}

const Dialog: React.FC<Props> = ({ open, toggleDialog, number, id }) => {
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    toggleDialog();
    try {
      await firestore.doc(`${email}/invoices/invoices/${id}`).delete();
      enqueueSnackbar('Invoice deleted', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    }
  };

  return (
    <MUIDialog className="customer-dialog" open={open} onClose={toggleDialog}>
      <div className="content">
        <p className="title"> Are you sure you want to delete invoice? </p>
        <div className="name">
          <span> {number} </span>
        </div>
        <div className="buttons">
          <Button color="primary" onClick={toggleDialog}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </MUIDialog>
  );
};

export default Dialog;
