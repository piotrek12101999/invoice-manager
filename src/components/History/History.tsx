import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';

const History: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { customers } = useData();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer();

  return (
    <>
      <ComponentLayout title="History" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} elements={customers} />
    </>
  );
};

export default History;
