import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useUI from '../../contexts/ui/useUI/useUI';

const Expenses: React.FC = () => {
  const { toggleDrawer } = useUI();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer();

  return (
    <>
      <ComponentLayout title="Expenses" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} />
    </>
  );
};

export default Expenses;
