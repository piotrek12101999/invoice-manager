import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { DescriptionRounded, MoreVertRounded } from '@material-ui/icons';
import dayjs from 'dayjs';
import { Invoice as InvoiceModel } from '../../../../../contexts/data/data.models';
import { formatPrice } from '../../../../../utils/formatPrice';
import Menu from '../../../../Invoices/InvoiceGroup/Invoice/Menu';
import Dialog from '../../../../Invoices/InvoiceGroup/Invoice/Dialog';

interface Props {
  data: InvoiceModel;
}

const Invoice: React.FC<Props> = ({ data: { id, customer, number, totalPrice, issueDate } }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const toggleDialog = () => setOpen((prevValue) => !prevValue);

  return (
    <>
      <div className="top-data">
        <div>
          <div className="category --invoice">
            <DescriptionRounded />
          </div>
          <div className="details">
            <p className="title"> {customer.name} </p>
            <p className="subtitle"> {number}</p>
          </div>
        </div>
        <IconButton onClick={handleOpen}>
          <MoreVertRounded />
        </IconButton>
      </div>
      <div className="bottom-data">
        <p className="date"> {dayjs(issueDate).format('D MMM, YYYY')}</p>
        <p className="price">Amount: {formatPrice(totalPrice)}</p>
      </div>
      <Menu anchorEl={anchorEl} handleClose={handleClose} id={id} toggleDialog={toggleDialog} />
      <Dialog open={open} toggleDialog={toggleDialog} id={id} number={number} />
    </>
  );
};

export default Invoice;
