import React from 'react';
import dayjs from 'dayjs';
import { Invoice as InvoiceModel } from '../../../contexts/data/data.models';
import Invoice from './Invoice/Invoice';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

interface Props {
  groupName: string;
  invoices: InvoiceModel[];
}

const InvoiceGroup: React.FC<Props> = ({ groupName, invoices }) => {
  return (
    <>
      <p className="invoice-month">{dayjs(groupName.length === 6 ? `0${groupName}` : groupName, 'MM-YYYY').format('MMMM YYYY')}</p>
      <div className="invoices-grid">
        {invoices.map((invoice) => (
          <Invoice key={invoice.id} data={invoice} />
        ))}
      </div>
    </>
  );
};

export default InvoiceGroup;
