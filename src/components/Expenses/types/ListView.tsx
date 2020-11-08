import dayjs from 'dayjs';
import React from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { Props } from './component-props.model';

const ListView: React.FC<Props> = ({ expenses, handleEdit }) => {
  return (
    <table cellSpacing="0" className="customers-table">
      <tbody>
        <tr className="table-header">
          <th className="heading"> Name </th>
          <th className="heading"> Price </th>
          <th className="heading"> Purchase date </th>
          <th className="heading"> Invoice </th>
        </tr>
        {expenses.map(({ id, name, price, purchaseDate, file }) => (
          <tr className="row" key={id} onClick={handleEdit(id)}>
            <td> {name} </td>
            <td> {formatPrice(price)} </td>
            <td> {dayjs(purchaseDate).format('D.M.YYYY')} </td>
            <td> {file ? file.name : 'N/A'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListView;
