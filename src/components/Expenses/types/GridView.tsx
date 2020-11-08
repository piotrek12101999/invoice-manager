import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formatPrice } from '../../../utils/formatPrice';
import StyledElementContainer from '../../shared/StyledElementContainer/StyledElementContainer';
import { Props } from './component-props.model';
import { CircularProgress, IconButton } from '@material-ui/core';
import { DescriptionRounded } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import useData from '../../../contexts/data/useData/useData';
import { storage } from '../../..';

const GridView: React.FC<Props> = ({ expenses, handleEdit }) => {
  const {
    user: { email }
  } = useData();
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleInvoiceDownload = (id: string) => async (event: React.MouseEvent) => {
    event.stopPropagation();
    setLoading(true);
    try {
      const url = await storage.child(`${email}/expenses/${id}`).getDownloadURL();
      window.open(url, '_blank');
    } catch (err) {
      enqueueSnackbar('Error while downloading file', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expenses-grid">
      {expenses.map(({ id, name, price, purchaseDate, file }) => (
        <StyledElementContainer className="element" key={id} onClick={handleEdit(id)}>
          <div className="info">
            <p className="name"> {name} </p>
            <p className="purchase-date">{dayjs(purchaseDate).format('D MMM, YYYY')}</p>
          </div>
          <div className="details">
            {file && (
              <IconButton onClick={handleInvoiceDownload(id)}>
                {isLoading ? <CircularProgress size={15} /> : <DescriptionRounded />}
              </IconButton>
            )}
            <p className="price">{formatPrice(price)}</p>
          </div>
        </StyledElementContainer>
      ))}
    </div>
  );
};

export default GridView;
