import React from 'react';
import { useSnackbar } from 'notistack';
import { firestore } from '../../../../../../../..';
import useData from '../../../../../../../../contexts/data/useData/useData';
import Layout from './Layout';
import { DialogVariantProps } from './dialog-variant.model';
import { customersCollection } from '../../../../../../../../contexts/data/collections';

const NewCustomer: React.FC<DialogVariantProps> = ({ setStep, data, toggleCustomerDialog, isLoading, setLoading }) => {
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddCustomer = async () => {
    setLoading(true);
    try {
      const { REGON, mail, ...customer } = data;

      await firestore.collection(customersCollection(email)).add({
        ...customer,
        ...(REGON && { REGON }),
        ...(mail && { mail })
      });
      enqueueSnackbar('Customer added', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('Error while adding customer', { variant: 'error' });
    } finally {
      setLoading(false);
      toggleCustomerDialog();
      setStep((prevStep) => ++prevStep);
    }
  };

  const handleCancel = () => {
    toggleCustomerDialog();
    setStep((prevStep) => ++prevStep);
  };

  return <Layout type="new" name={data.name} handleCancel={handleCancel} handleAction={handleAddCustomer} isLoading={isLoading} />;
};

export default NewCustomer;
