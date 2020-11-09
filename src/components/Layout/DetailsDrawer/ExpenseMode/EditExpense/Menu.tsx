import React, { useState } from 'react';
import { CircularProgress, Menu as MUIMenu, MenuItem, Dialog, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { firestore, storage } from '../../../../..';
import { expensesCollection } from '../../../../../contexts/data/collections';

interface Props {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  id: string;
  email: string;
  disabled: boolean;
  closeDrawer: () => void;
}

const Menu: React.FC<Props> = ({ anchorEl, handleMenuClose, id, email, disabled, closeDrawer }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const toggleDialog = () => setOpen((prevValue) => !prevValue);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const url = await storage.child(`${email}/expenses/${id}`).getDownloadURL();
      window.open(url, '_blank');
    } catch (err) {
      enqueueSnackbar('Error while downloading file', { variant: 'error' });
    } finally {
      handleMenuClose();
      setLoading(false);
    }
  };

  const handleDelete = () => {
    handleMenuClose();
    toggleDialog();
  };

  const handleExpenseDelete = async () => {
    try {
      await firestore.doc(`${expensesCollection(email)}/${id}`).delete();
      enqueueSnackbar('Expense deleted', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    } finally {
      toggleDialog();
      closeDrawer();
    }
  };

  return (
    <>
      <MUIMenu className="menu-invoice" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem className={isLoading ? 'loading' : ''} disabled={disabled} onClick={handleDownload}>
          Download file
          {isLoading && (
            <div className="overlay">
              <CircularProgress size={15} />
            </div>
          )}
        </MenuItem>
        <MenuItem className="delete" onClick={handleDelete}>
          Delete
        </MenuItem>
      </MUIMenu>
      <Dialog className="customer-dialog" open={open} onClose={toggleDialog}>
        <div className="content">
          <p className="title"> Are you sure you want to delete expense? </p>
          <div className="buttons">
            <Button color="primary" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleExpenseDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Menu;
