import React, { useState } from 'react';
import { CircularProgress, Menu as MUIMenu, MenuItem } from '@material-ui/core';
import { storage } from '../../../..';
import useData from '../../../../contexts/data/useData/useData';
import { useSnackbar } from 'notistack';

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  toggleDialog: () => void;
  id: string;
}

const Menu: React.FC<Props> = ({ anchorEl, handleClose, toggleDialog, id }) => {
  const [isLoading, setLoading] = useState(false);
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const url = await storage.child(`${email}/invoices/${id}`).getDownloadURL();
      window.open(url, '_blank');
    } catch (err) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleDelete = () => {
    handleClose();
    toggleDialog();
  };

  return (
    <MUIMenu className="menu-invoice" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem className={isLoading ? 'loading' : ''} onClick={handleDownload}>
        Download PDF
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
  );
};

export default Menu;
