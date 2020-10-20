import React, { useState, Dispatch, SetStateAction } from 'react';
import { LinearProgress } from '@material-ui/core';
import BasicData from './steps/BasicData/BasicData';
import Customer from './steps/Customer/Customer';
import Products from './steps/Products/Products';
import Details from './steps/Details/Details';
import { InvoiceForm } from '../../../contexts/data/data.models';

function getStepContent(step: number, setData: Dispatch<SetStateAction<InvoiceForm>>, setStep: Dispatch<SetStateAction<number>>) {
  const sharedProps = {
    setData,
    setStep
  };

  switch (step) {
    case 0:
      return {
        title: '1. Check invoice data',
        content: <BasicData {...sharedProps} />
      };
    case 1:
      return {
        title: '2. Select or create customer',
        content: <Customer {...sharedProps} />
      };
    case 2:
      return {
        title: '3. Add products to sell',
        content: <Products setData={setData} />
      };
    case 3:
      return {
        title: '4. Fill details',
        content: <Details />
      };
    default:
      return {
        title: 'Uknown step',
        content: <div> Unknown step </div>
      };
  }
}

const DialogContent: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<InvoiceForm>({
    number: '',
    saleDate: new Date(),
    issueDate: new Date(),
    totalPrice: 0,
    customer: null,
    products: [],
    details: null
  });
  const { title, content } = getStepContent(step, setData, setStep);

  return (
    <>
      <LinearProgress className="progress" variant="determinate" value={(step + 1) * 25} />
      <div className="content">
        <p className="title"> {title} </p>
        {content}
      </div>
    </>
  );
};

export default DialogContent;
