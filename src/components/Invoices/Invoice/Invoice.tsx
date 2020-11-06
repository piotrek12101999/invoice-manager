import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Invoice as InvoiceModel } from '../../../contexts/data/data.models';
import StyledElementContainer from '../../shared/StyledElementContainer/StyledElementContainer';
import { MoreVertRounded, CalendarTodayRounded, PaymentRounded } from '@material-ui/icons';
import Menu from './Menu';
import Dialog from './Dialog';

interface Props {
  data: InvoiceModel;
}

const Invoice: React.FC<Props> = ({
  data: {
    id,
    number,
    issueDate,
    totalPrice,
    customer: { name },
    isGeneratedPDF
  }
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const toggleDialog = () => setOpen((prevValue) => !prevValue);

  return (
    <>
      <StyledElementContainer className={`invoice ${!isGeneratedPDF && 'disabled'}`}>
        <div className="top-elements">
          <div className="element">
            <div className="customer"> {name} </div>
            <div className="number"> Number: {number} </div>
          </div>
          <IconButton onClick={handleOpen}>
            <MoreVertRounded />
          </IconButton>
        </div>
        <div className="bottom-elements">
          <div className="element">
            <CalendarTodayRounded /> <span> Date: {dayjs(issueDate).format('D.M.YYYY')} </span>
          </div>
          <div className="element">
            <PaymentRounded /> <span>Total price: {totalPrice} PLN </span>
          </div>
        </div>
        {!isGeneratedPDF && (
          <div className="overlay">
            <CircularProgress size={60} />
          </div>
        )}
      </StyledElementContainer>
      <Menu anchorEl={anchorEl} handleClose={handleClose} id={id} toggleDialog={toggleDialog} />
      <Dialog open={open} toggleDialog={toggleDialog} id={id} number={number} />
    </>
  );
};

export default Invoice;
