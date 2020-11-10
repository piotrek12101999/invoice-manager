import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import ComponentLayout from '../shared/ComponentLayout/ComponentLayout';
import useUI from '../../contexts/ui/useUI/useUI';
import useData from '../../contexts/data/useData/useData';
import { groupElements, HistoryExpense, HistoryInvoice } from './groupElements';
import ElementsGroup from './ElementsGroup/ElementsGroup';
import dayjs from 'dayjs';
import { omit } from '../../utils/omit';

const History: React.FC = () => {
  const { toggleDrawer } = useUI();
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { invoices, expenses } = useData();
  const historyExpenses: HistoryExpense[] = expenses.map((expense) => ({ ...expense, type: 'expense' }));
  const invoicesExpenses: HistoryInvoice[] = invoices.map((invoice) => ({ ...invoice, type: 'invoice' }));

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleOpenDrawer = (type: 'invoice' | 'expense') => () => {
    handleClose();
    toggleDrawer(type);
  };

  const filterElements = () => {
    if (!value) {
      return [...historyExpenses, ...invoicesExpenses];
    }

    return [...historyExpenses, ...invoicesExpenses].filter((element) => {
      if (element.type === 'expense') {
        return Object.values(omit(element, ['id', 'file'])).some((property) => {
          if (typeof property === 'object') {
            return dayjs(property).format('D MMM, YYYY').toLowerCase().includes(value.toLowerCase());
          }

          return `${property}`.toLowerCase().includes(value.toLowerCase());
        });
      } else {
        const shortenObject = {
          name: element.customer.name,
          number: element.number,
          date: dayjs(element.issueDate).format('D MMM, YYYY'),
          price: element.totalPrice.toString()
        };

        return Object.values(shortenObject).some((element) => element.toLowerCase().includes(value.toLowerCase()));
      }
    });
  };

  const groupedElements = groupElements(filterElements());

  return (
    <>
      <ComponentLayout title="History" value={value} setValue={setValue} handleDrawerOpen={handleMenuOpen} />
      {Object.keys(groupedElements).map((key) => (
        <ElementsGroup key={key} groupName={key} elements={groupedElements[key]} />
      ))}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenDrawer('invoice')}>Add invoice</MenuItem>
        <MenuItem onClick={handleOpenDrawer('expense')}>Add expense</MenuItem>
      </Menu>
    </>
  );
};

export default History;
