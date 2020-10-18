import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import Customer from './steps/Customer/Customer';
import Products from './steps/Products/Products';
import Details from './steps/Details/Details';
import { InvoiceForm } from '../../../contexts/data/data.models';

function getStepContent(step: number, setData: React.Dispatch<React.SetStateAction<InvoiceForm>>) {
  switch (step) {
    case 0:
      return <Customer setData={setData} />;
    case 1:
      return <Products setData={setData} />;
    case 2:
      return <Details />;
    default:
      return 'Unknown step';
  }
}

const DialogContent: React.FC = () => {
  const [step, setStep] = useState(2);
  const [data, setData] = useState<InvoiceForm>({
    number: '',
    saleDate: new Date(),
    issueDate: new Date(),
    totalPrice: 0,
    customer: null,
    products: [],
    details: null
  });

  return (
    <>
      <LinearProgress className="progress" variant="determinate" value={step * 20} />
      <div className="content">
        <p className="title"> 1. Select or create customer </p>
        {getStepContent(step, setData)}
      </div>
    </>
  );
};

export default DialogContent;
