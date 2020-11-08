import React from 'react';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';
import ListView from './types/ListView';
import GridView from './types/GridView';
import useListView from '../../hooks/useListView';
import useElementsFilter from '../../hooks/useElementsFilter';

const Expenses: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { expenses } = useData();
  const { isListView, handleListViewSelect } = useListView('expenses_view');
  const { value, setValue, filterElements } = useElementsFilter(expenses, ['id', 'file']);

  const handleEdit = (id: string) => () => toggleDrawer('edit-expense', id);

  const handleDrawerOpen = () => toggleDrawer('expense');

  return (
    <>
      <ComponentLayout
        title="Expenses"
        value={value}
        setValue={setValue}
        handleDrawerOpen={handleDrawerOpen}
        isListViewSupported
        isListView={isListView}
        setListView={handleListViewSelect}
      />
      {isListView ? (
        <ListView expenses={filterElements()} handleEdit={handleEdit} />
      ) : (
        <GridView expenses={filterElements()} handleEdit={handleEdit} />
      )}
    </>
  );
};

export default Expenses;
