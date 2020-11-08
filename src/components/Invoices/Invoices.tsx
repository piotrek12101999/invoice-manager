import React, { useState } from 'react';
import dayjs from 'dayjs';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useData from '../../contexts/data/useData/useData';
import useUI from '../../contexts/ui/useUI/useUI';
import InvoiceGroup from './InvoiceGroup/InvoiceGroup';
import { groupInvoices } from './groupInvoices';

const Invoices: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { invoices } = useData();
  const [value, setValue] = useState('');

  const handleDrawerOpen = () => toggleDrawer('invoice');

  const filterInvoices = () => {
    if (!value) {
      return invoices;
    }

    return invoices.filter(({ customer: { name }, number, issueDate, totalPrice }) => {
      const shortenObject = {
        name,
        number,
        date: dayjs(issueDate).format('D MMM, YYYY'),
        price: totalPrice.toString()
      };

      return Object.values(shortenObject).some((element) => element.toLowerCase().includes(value.toLowerCase()));
    });
  };

  const groupedInvoices = groupInvoices(filterInvoices());

  return (
    <>
      <ComponentLayout title="Invoices" value={value} setValue={setValue} handleDrawerOpen={handleDrawerOpen} />
      {Object.keys(groupedInvoices).map((key) => (
        <InvoiceGroup key={key} groupName={key} invoices={groupedInvoices[key]} />
      ))}
    </>
  );
};

export default Invoices;
