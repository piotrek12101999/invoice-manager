import React, { useState, Dispatch, SetStateAction } from 'react';
import { LinearProgress } from '@material-ui/core';
import BasicData from './steps/BasicData/BasicData';
import Customer from './steps/Customer/Customer';
import Products from './steps/Products/Products';
import Details from './steps/Details/Details';
import { InvoiceForm } from '../../../contexts/data/data.models';
import useDialogForm, { useDialogFormType } from './useDialogForm';

function getStepContent(step: number, setStep: Dispatch<SetStateAction<number>>, forms: useDialogFormType) {
  switch (step) {
    case 0:
      return {
        title: '1. Check invoice data',
        content: <BasicData setStep={setStep} form={forms.basicDataForm} />
      };
    case 1:
      return {
        title: '2. Select or create customer',
        content: <Customer setStep={setStep} form={forms.customerForm} />
      };
    case 2:
      return {
        title: '3. Add products to sell',
        content: <Products setStep={setStep} form={forms.productsForm} />
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
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InvoiceForm>({
    number: '',
    saleDate: new Date(),
    issueDate: new Date(),
    totalPrice: 0,
    customer: null,
    products: [],
    details: null
  });
  const forms = useDialogForm();
  const { title, content } = getStepContent(step, setStep, forms);

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
