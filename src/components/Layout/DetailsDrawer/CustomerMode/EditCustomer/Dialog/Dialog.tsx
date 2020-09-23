import React from 'react';
import { Dialog as MUIDialog, Button } from '@material-ui/core';
import Avatar from '../../../../../shared/Avatar/Avatar';
import { firestore } from '../../../../../..';
import { useSnackbar } from 'notistack';

interface Props {
  name: string;
  id: string;
  email: string;
  isDialogOpen: boolean;
  toggleDialog: () => void;
  handleClose: () => void;
}

const Dialog: React.FC<Props> = ({ name, id, email, isDialogOpen, toggleDialog, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    toggleDialog();
    handleClose();
    try {
      await firestore.doc(`${email}/customers/customers/${id}`).delete();
      enqueueSnackbar('Customer deleted', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    }
  };

  return (
    <MUIDialog className="customer-dialog" open={isDialogOpen} onClose={toggleDialog}>
      <div className="content">
        <p className="title"> Are you sure you want to delete customer? </p>
        <div className="name">
          <Avatar size="small" text={`${name}`} /> <span> {name} </span>
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
