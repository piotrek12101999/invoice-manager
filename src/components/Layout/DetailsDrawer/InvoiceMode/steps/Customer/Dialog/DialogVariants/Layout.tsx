import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import Avatar from '../../../../../../../shared/Avatar/Avatar';

interface Props {
  name: string;
  type: 'edit' | 'new';
  handleCancel: () => void;
  handleAction: () => void;
  isLoading: boolean;
}

function getDialogText(type: 'edit' | 'new') {
  switch (type) {
    case 'new':
      return {
        title: 'Would you like add this customer?',
        button: 'Save'
      };

    case 'edit':
      return {
        title: 'Customer that has been choosen was edited. Would you like save those changes to this customer?',
        button: 'Edit'
      };
  }
}

const Layout: React.FC<Props> = ({ name, type, handleCancel, handleAction, isLoading }) => {
  const { title, button } = getDialogText(type);

  return (
    <div className="add-invoice-customer-dialog">
      <p className="title"> {title} </p>
      <div className="data">
        <Avatar size="small" text={name} />
        <p className="name"> {name} </p>
      </div>
      <div className="buttons">
        <Button color="primary" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleAction} disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} className="progress" /> : button}
        </Button>
      </div>
    </div>
  );
};

export default Layout;
