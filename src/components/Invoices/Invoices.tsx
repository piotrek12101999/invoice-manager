import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';

const Invoices: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { customers } = useData();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer();

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} elements={customers} />
    </>
  );
};

export default Invoices;
