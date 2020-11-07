import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Dialog, Button, Chip, CircularProgress } from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import { useDialogFormType } from '../../useDialogForm';
import useData from '../../../../../../contexts/data/useData/useData';
import { firestore } from '../../../../../..';
import { useSnackbar } from 'notistack';
import useUI from '../../../../../../contexts/ui/useUI/useUI';
import { formatPrice } from '../../../../../../utils/formatPrice';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  forms: useDialogFormType;
}

const Summary: React.FC<Props> = ({ setStep, forms: { basicDataForm, customerForm, productsForm, detailsForm } }) => {
  const { toggleDrawer } = useUI();
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const basicData = basicDataForm.getValues();
  const customerData = customerForm.getValues();
  const { products } = productsForm.getValues();
  const detailsData = detailsForm.getValues();

  const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBack = () => setStep((prevStep) => --prevStep);

  const toggleDialog = () => {
    if (!isLoading) {
      setOpen((prevValue) => !prevValue);
    }
  };

  const addDetailsObject = () => {
    const { status, isStatus, partlyPaid, isPartlyPaid, paymentDeadline, isPaymentDeadline, comments, areComments } = detailsData;

    if (!isStatus && !isPartlyPaid && !isPaymentDeadline && !areComments) {
      return {};
    }

    return {
      details: {
        ...(status && isStatus && { status }),
        ...(partlyPaid && isPartlyPaid && { partlyPaid: parseFloat(partlyPaid) }),
        ...(comments && areComments && { comments }),
        ...(paymentDeadline && isPaymentDeadline && { paymentDeadline })
      }
    };
  };

  const handleInvoiceAdd = async () => {
    setLoading(true);
    try {
      await firestore.collection(`${email}/invoices/invoices`).add({
        ...basicData,
        totalPrice: products.reduce((sum, { grossAmount }) => sum + parseFloat(grossAmount), 0),
        customer: {
          ...customerData,
          mailingList: customerData.mailingList.map(({ value }) => value)
        },
        products: products.map(({ name, VATRate, grossAmount, netPrice, quantity }) => ({
          name,
          VATRate: parseFloat(VATRate),
          grossAmount: parseFloat(grossAmount),
          netPrice: parseFloat(netPrice),
          quantity: parseFloat(quantity)
        })),
        isGeneratedPDF: false,
        ...addDetailsObject()
      });
      enqueueSnackbar('Invoice added', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
    } finally {
      setLoading(false);
      toggleDialog();
      toggleDrawer();
    }
  };

  return (
    <>
      <div className="summary">
        <Accordion expanded={expanded === 'basic_data'} onChange={handleChange('basic_data')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="summary-content">
            Basic data
          </AccordionSummary>
          <AccordionDetails className="summary-content">
            <p> Number: {basicData.number} </p>
            <p> Issue date: {basicData.issueDate.toDateString()} </p>
            <p> Sale date: {basicData.saleDate.toDateString()} </p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'customer'} onChange={handleChange('customer')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="summary-content">
            Customer data
          </AccordionSummary>
          <AccordionDetails className="summary-content">
            <p> Name: {customerData.name} </p>
            <p> NIP: {customerData.NIP} </p>
            {customerData.REGON && <p> REGON: {customerData.REGON} </p>}
            <p>
              Address: {customerData.street}, {customerData.city} {customerData.postalCode}
            </p>
            <div className="mailing-list">
              <span className="title"> Mailing list: </span>
              {customerData.mailingList.map((mail, index) => (
                <Chip key={index} label={mail.value} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'products'} onChange={handleChange('products')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="summary-content">
            Products data
          </AccordionSummary>
          <AccordionDetails className="summary-content">
            {products.map((product, index) => (
              <div key={index}>
                <p> Name: {product.name} </p>
                <p> Quantity: {product.quantity} </p>
                <p> Net price: {formatPrice(parseFloat(product.netPrice))} </p>
                <p> Gross amount: {formatPrice(parseFloat(product.grossAmount))} </p>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'details'} onChange={handleChange('details')}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="summary-content">
            Additional details
          </AccordionSummary>
          <AccordionDetails className="summary-content">
            {detailsData.isStatus && <p> Status: {detailsData.status} </p>}
            {detailsData.isPartlyPaid && <p> Partly paid: {detailsData.partlyPaid} </p>}
            {detailsData.isPaymentDeadline && <p> Payment deadline: {detailsData.paymentDeadline?.toDateString()} </p>}
            {detailsData.areComments && <p> Comment: {detailsData.comments} </p>}
            {!detailsData.isStatus && !detailsData.isPartlyPaid && !detailsData.isPaymentDeadline && !detailsData.areComments && (
              <p> Details haven't been added </p>
            )}
          </AccordionDetails>
        </Accordion>
        <div className="buttons">
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={toggleDialog}>
            Save
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={toggleDialog}>
        <div className="dialog-summary-invoice">
          <p className="title">
            Are you sure? <span> Invoice can't be upated </span>
          </p>
          <div className="buttons">
            <Button color="primary" onClick={toggleDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleInvoiceAdd} disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} className="progress" /> : 'Save'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Summary;
