import React from 'react';
import { Drawer } from '@material-ui/core';
import useUI from '../../../contexts/ui/useUI/useUI';
import CreateCustomer from './CustomerMode/CreateCustomer/CreateCustomer';
import EditCustomer from './CustomerMode/EditCustomer/EditCustomer';
import CreateInvoice from './InvoiceMode/InvoiceMode';
import CreateExpense from './ExpenseMode/CreateExpense/CreateExpense';
import EditExpense from './ExpenseMode/EditExpense/EditExpense';

const DetailsDrawer: React.FC = () => {
  const {
    drawer: { open, type, editID },
    toggleDrawer
  } = useUI();

  const handleClose = () => toggleDrawer();

  const renderType = () => {
    switch (type) {
      case 'customer':
        return <CreateCustomer handleClose={handleClose} />;
      case 'edit-customer':
        return <EditCustomer handleClose={handleClose} id={`${editID}`} />;
      case 'invoice':
        return <CreateInvoice />;
      case 'expense':
        return <CreateExpense handleClose={handleClose} />;
      case 'edit-expense':
        return <EditExpense handleClose={handleClose} id={`${editID}`} />;
      default:
        break;
    }
  };

  return (
    <Drawer className="details-drawer" open={open} anchor="right" onClose={handleClose}>
      <div className="content">{renderType()}</div>
    </Drawer>
  );
};

export default DetailsDrawer;
