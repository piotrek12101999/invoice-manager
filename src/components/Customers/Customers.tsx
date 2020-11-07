import React, { useState } from 'react';
import ListView from './types/ListView';
import GridView from './types/GridView';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import { omit } from '../../utils/omit';

const Customers: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { customers } = useData();
  const [value, setValue] = useState('');
  const [isListView, setListView] = useState(localStorage.getItem('customers_view') === 'list');

  const handleEdit = (id: string) => () => toggleDrawer('edit-customer', id);

  const handleListViewSelect = (isListViewSelected: boolean) => () => {
    localStorage.setItem('customers_view', isListViewSelected ? 'list' : 'grid');
    setListView(isListViewSelected);
  };

  const handleDrawerOpen = () => toggleDrawer('customer');

  const filterCustomers = () => {
    if (!value) {
      return customers;
    }

    return customers.filter((customer) =>
      Object.values(omit(customer, ['id', 'mailingList'])).some((element) => element.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return (
    <>
      <ComponentLayout
        title="Customers"
        value={value}
        setValue={setValue}
        handleDrawerOpen={handleDrawerOpen}
        isListViewSupported
        isListView={isListView}
        setListView={handleListViewSelect}
      />
      {isListView ? (
        <ListView customers={filterCustomers()} handleEdit={handleEdit} />
      ) : (
        <GridView customers={filterCustomers()} handleEdit={handleEdit} />
      )}
    </>
  );
};

export default Customers;
