import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { MoreVertRounded, ShoppingCartRounded } from '@material-ui/icons';
import dayjs from 'dayjs';
import { Expense as ExpenseModel } from '../../../../../contexts/data/data.models';
import { formatPrice } from '../../../../../utils/formatPrice';
import Menu from '../../../../Layout/DetailsDrawer/ExpenseMode/EditExpense/Menu';
import useData from '../../../../../contexts/data/useData/useData';

interface Props {
  data: ExpenseModel;
}

const Expense: React.FC<Props> = ({ data: { id, name, price, purchaseDate, file } }) => {
  const {
    user: { email }
  } = useData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <div className="top-data">
        <div>
          <div className="category --expense">
            <ShoppingCartRounded />
          </div>
          <p className="title"> {name} </p>
        </div>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertRounded />
        </IconButton>
      </div>
      <div className="bottom-data">
        <p className="date"> {dayjs(purchaseDate).format('D MMM, YYYY')}</p>
        <p className="price">Amount: {formatPrice(price)}</p>
      </div>
      <Menu anchorEl={anchorEl} handleMenuClose={handleMenuClose} id={id} email={email} disabled={!Boolean(file)} />
    </>
  );
};

export default Expense;
