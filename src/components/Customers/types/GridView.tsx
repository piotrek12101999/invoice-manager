import React from 'react';
import { Customer } from '../../../contexts/data/data.models';
import StyledElementContainer from '../../shared/StyledElementContainer/StyledElementContainer';
import Avatar from '../../shared/Avatar/Avatar';
import { PlaceRounded, DescriptionRounded } from '@material-ui/icons';

interface Props {
  customers: Customer[];
  handleEdit: (id: string) => () => void;
}

const GridView: React.FC<Props> = ({ customers, handleEdit }) => {
  return (
    <div className="customers-grid">
      {customers.map(({ id, name, street, city, postalCode, NIP }) => (
        <StyledElementContainer className="element" key={id} onClick={handleEdit(id)}>
          <Avatar size="medium" text={name} className="avatar" />
          <p className="name"> {name} </p>
          <p className="address">
            <PlaceRounded className="icon" />
            <span>
              {street}, {postalCode} {city}
            </span>
          </p>
          <p className="tax-id">
            <DescriptionRounded className="icon" />
            <span>{NIP}</span>
          </p>
        </StyledElementContainer>
      ))}
    </div>
  );
};

export default GridView;
