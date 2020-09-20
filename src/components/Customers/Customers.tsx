import React, { useState } from 'react';
import { TextField, InputAdornment, Fab, IconButton } from '@material-ui/core';
import { SearchRounded, AddRounded, ListRounded, AppsRounded } from '@material-ui/icons';
import StyledIconsContainer from '../shared/StyledIconsContainer/StyledIconsContainer';
import ListView from './types/ListView';
import GridView from './types/GridView';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';

function omit(obj: Object, keys: string[]) {
  const keysToRemove = new Set(keys.flat());

  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keysToRemove.has(k)));
}

const Customers: React.FC = () => {
  const { toggleDrawer } = useUI();
  const { customers } = useData();
  const [value, setValue] = useState('');
  const [isListView, setListView] = useState(localStorage.getItem('customers_view') === 'list');

  const handleDrawerOpen = () => toggleDrawer('customer');

  const handleEdit = (id: string) => () => toggleDrawer('edit-customer', id);

  const handleListViewSelect = (isListViewSelected: boolean) => () => {
    localStorage.setItem('customers_view', isListViewSelected ? 'list' : 'grid');
    setListView(isListViewSelected);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

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
      <div className="customers-top-nav">
        <p className="title"> Customers </p>
        <div className="actions">
          <TextField
            className="input"
            size="small"
            variant="outlined"
            placeholder="Search"
            value={value}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              )
            }}
          />
          <StyledIconsContainer className="icons">
            <IconButton color={isListView ? 'secondary' : 'inherit'} onClick={handleListViewSelect(true)}>
              <ListRounded />
            </IconButton>
            <IconButton color={!isListView ? 'secondary' : 'inherit'} onClick={handleListViewSelect(false)}>
              <AppsRounded />
            </IconButton>
          </StyledIconsContainer>
          <Fab className="fab" color="primary" size="small" onClick={handleDrawerOpen}>
            <AddRounded />
          </Fab>
        </div>
      </div>
      {isListView ? (
        <ListView customers={filterCustomers()} handleEdit={handleEdit} />
      ) : (
        <GridView customers={filterCustomers()} handleEdit={handleEdit} />
      )}
    </>
  );
};

export default Customers;
