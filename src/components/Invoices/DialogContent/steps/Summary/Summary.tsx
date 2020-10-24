import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Dialog, Button, Chip } from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import { useDialogFormType } from '../../useDialogForm';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  forms: useDialogFormType;
}

const Summary: React.FC<Props> = ({ setStep, forms: { basicDataForm, customerForm, productsForm, detailsForm } }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const basicData = basicDataForm.getValues();
  const customerData = customerForm.getValues();
  const productsData = productsForm.getValues();
  const detailsData = detailsForm.getValues();

  const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBack = () => setStep((prevStep) => --prevStep);

  const toggleDialog = () => setOpen((prevValue) => !prevValue);

  const handleInvoiceAdd = async () => {
    try {
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="summary">
        <Accordion expanded={expanded === 'basic_data'} onChange={handleChange('basic_data')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="content">
            Basic data
          </AccordionSummary>
          <AccordionDetails className="content">
            <p> Number: {basicData.number} </p>
            <p> Issue date: {basicData.issueDate.toDateString()} </p>
            <p> Sale date: {basicData.saleDate.toDateString()} </p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'customer'} onChange={handleChange('customer')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="content">
            Customer data
          </AccordionSummary>
          <AccordionDetails className="content">
            <p> Name: {customerData.name} </p>
            <p> NIP: {customerData.NIP} </p>
            {customerData.REGON && <p> REGON: {customerData.REGON} </p>}
            <p>
              Address: {customerData.street}, {customerData.city} {customerData.postalCode}
            </p>
            <p className="mailing-list">
              <span className="title"> Mailing list: </span>
              {customerData.mailingList.map((mail, index) => (
                <Chip key={index} label={mail.value} />
              ))}
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'products'} onChange={handleChange('products')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="content">
            Products data
          </AccordionSummary>
          <AccordionDetails className="content">
            {productsData.products.map((product, index) => (
              <div key={index}>
                <p> Name: {product.name} </p>
                <p> Quantity: {product.quantity} </p>
                <p> Net price: {product.netPrice} PLN </p>
                <p> Gross amount: {product.grossAmount} PLN </p>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'details'} onChange={handleChange('details')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="content">
            Additional details
          </AccordionSummary>
          <AccordionDetails className="content">
            {detailsData.status && <p> Status: {detailsData.status} </p>}
            {detailsData.partlyPaid && <p> Partly paid: {detailsData.partlyPaid} </p>}
            {detailsData.paymentDeadline && <p> Payment deadline: {detailsData.paymentDeadline.toDateString()} </p>}
            {detailsData.comments && <p> Comment: {detailsData.comments} </p>}
            {Object.keys(detailsData).length === 0 && <p> Details haven't been added </p>}
          </AccordionDetails>
        </Accordion>
        <AccordionActions className="actions">
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={toggleDialog}>
            Save
          </Button>
        </AccordionActions>
      </div>
      <Dialog open={open} onClose={toggleDialog}>
        <div className="dialog-summary-invoice">
          <p className="title">
            Are you sure? <span> Invoice can't be upated </span>
          </p>
          <div className="buttons">
            <Button color="primary" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleInvoiceAdd}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Summary;
