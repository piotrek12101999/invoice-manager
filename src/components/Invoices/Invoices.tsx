import React, { useState } from 'react';
import { Dialog as MUIDialog } from '@material-ui/core';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
// import useData from '../../contexts/data/useData/useData';
import DialogContent from './DialogContent/DialogContent';

const Invoices: React.FC = () => {
  // const { invoices } = useData();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState('');

  const toggleDialog = () => setDialogOpen((prevValue) => !prevValue);

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={toggleDialog} />
      <MUIDialog className="dialog-invoices" open={isDialogOpen} onClose={toggleDialog}>
        <DialogContent />
      </MUIDialog>
    </>
  );
};

export default Invoices;
