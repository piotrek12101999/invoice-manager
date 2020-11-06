import React from 'react';
import { Menu as MUIMenu, MenuItem } from '@material-ui/core';
import { storage } from '../../../';
import useData from '../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  toggleDialog: () => void;
  id: string;
}

const Menu: React.FC<Props> = ({ anchorEl, handleClose, toggleDialog, id }) => {
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const handleDownload = async () => {
    handleClose();
    try {
      const url = await storage.child(`${email}/invoices/${id}`).getDownloadURL();
      window.open(url, '_blank');
    } catch (err) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    }
  };

  const handleDelete = () => {
    handleClose();
    toggleDialog();
  };

  return (
    <MUIMenu className="menu-invoice" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleDownload}>Download PDF</MenuItem>
      <MenuItem className="delete" onClick={handleDelete}>
        Delete
      </MenuItem>
    </MUIMenu>
  );
};

export default Menu;
