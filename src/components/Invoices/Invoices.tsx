import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
// import useData from '../../contexts/data/useData/useData';
import useUI from '../../contexts/ui/useUI/useUI';

const Invoices: React.FC = () => {
  const { toggleDrawer } = useUI();
  // const { invoices } = useData();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer('invoice');

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} />
    </>
  );
};

export default Invoices;
