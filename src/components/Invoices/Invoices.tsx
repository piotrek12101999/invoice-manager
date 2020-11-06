import React, { useState } from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useData from '../../contexts/data/useData/useData';
import useUI from '../../contexts/ui/useUI/useUI';
import Invoice from './Invoice/Invoice';

const Invoices: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { invoices } = useData();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer('invoice');

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} />
      <div className="invoices-grid">
        {invoices.map((invoice) => (
          <Invoice key={invoice.id} data={invoice} />
        ))}
      </div>
    </>
  );
};

export default Invoices;
