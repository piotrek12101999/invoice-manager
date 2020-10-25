import React, { useState, Dispatch, SetStateAction } from 'react';
import { LinearProgress } from '@material-ui/core';
import BasicData from './steps/BasicData/BasicData';
import Customer from './steps/Customer/Customer';
import Products from './steps/Products/Products';
import Details from './steps/Details/Details';
import Summary from './steps/Summary/Summary';
import useDialogForm, { useDialogFormType } from './useDialogForm';

function getStepContent(step: number, setStep: Dispatch<SetStateAction<number>>, forms: useDialogFormType) {
  switch (step) {
    case 0:
      return {
        title: 'New invoice',
        content: <BasicData setStep={setStep} form={forms.basicDataForm} />
      };
    case 1:
      return {
        title: 'Select or create customer',
        content: <Customer setStep={setStep} form={forms.customerForm} />
      };
    case 2:
      return {
        title: 'Add products to sell',
        content: <Products setStep={setStep} form={forms.productsForm} />
      };
    case 3:
      return {
        title: 'Fill details',
        content: <Details setStep={setStep} form={forms.detailsForm} />
      };
    case 4:
      return {
        title: 'Summary',
        content: <Summary setStep={setStep} forms={forms} />
      };
    default:
      return {
        title: 'Uknown step',
        content: <div> Unknown step </div>
      };
  }
}

const InvoiceMode: React.FC = () => {
  const [step, setStep] = useState(0);

  const forms = useDialogForm();
  const { title, content } = getStepContent(step, setStep, forms);

  return (
    <>
      <div className="steps">
        <p className="step"> Step {step + 1} / 5 </p>
        <p className="title"> {title}</p>
      </div>
      <LinearProgress className="progress" variant="determinate" value={(step + 1) * 20} />
      {content}
    </>
  );
};

export default InvoiceMode;
