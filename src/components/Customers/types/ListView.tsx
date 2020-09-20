import React from 'react';
import { Customer } from '../../../contexts/data/data.models';
import Avatar from '../../shared/Avatar/Avatar';

interface Props {
  customers: Customer[];
  handleEdit: (id: string) => () => void;
}

const ListView: React.FC<Props> = ({ customers, handleEdit }) => {
  return (
    <table cellSpacing="0" className="customers-table">
      <tbody>
        <tr className="table-header">
          <th className="heading"> Name </th>
          <th className="heading"> NIP </th>
          <th className="heading"> REGON </th>
          <th className="heading"> Street </th>
          <th className="heading"> Postal code </th>
          <th className="heading"> City </th>
        </tr>
        {customers.map(({ id, name, NIP, REGON, city, street, postalCode }) => (
          <tr className="row" key={id} onClick={handleEdit(id)}>
            <td className="name">
              <Avatar size="extraSmall" text={name} invertedColors /> <span> {name} </span>
            </td>
            <td> {NIP} </td>
            <td> {REGON || 'N/A'} </td>
            <td> {street} </td>
            <td> {postalCode} </td>
            <td> {city} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListView;
