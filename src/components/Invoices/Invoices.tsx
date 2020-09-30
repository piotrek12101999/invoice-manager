import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useData from '../../contexts/data/useData/useData';
import Dialog from './Dialog/Dialog';

const Invoices: React.FC = () => {
  const { invoices } = useData();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState('');

  const toggleDialog = () => setDialogOpen((prevValue) => !prevValue);

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={toggleDialog} />
      <Dialog open={isDialogOpen} onClose={toggleDialog} />
    </>
  );
};

export default Invoices;
