import React from 'react';
import ListView from './types/ListView';
import GridView from './types/GridView';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useListView from '../../hooks/useListView';
import useElementsFilter from '../../hooks/useElementsFilter';

const Customers: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { customers } = useData();
  const { isListView, handleListViewSelect } = useListView('customers_view');
  const { value, setValue, filterElements } = useElementsFilter(customers, ['id', 'mailingList']);

  const handleEdit = (id: string) => () => toggleDrawer('edit-customer', id);

  const handleDrawerOpen = () => toggleDrawer('customer');

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
        <ListView customers={filterElements()} handleEdit={handleEdit} />
      ) : (
        <GridView customers={filterElements()} handleEdit={handleEdit} />
      )}
    </>
  );
};

export default Customers;
