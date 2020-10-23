import React from 'react';
import { useSnackbar } from 'notistack';
import { firestore as staticFirestore } from 'firebase/app';
import { firestore } from '../../../../../..';
import useData from '../../../../../../contexts/data/useData/useData';
import Layout from './Layout';
import { DialogVariantProps } from './dialog-variant.model';

interface Props extends DialogVariantProps {
  originalName: string;
}

const EditCustomer: React.FC<Props> = ({ setStep, data, originalName, toggleCustomerDialog, setLoading, isLoading }) => {
  const {
    user: { email }
  } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const handleEditCustomer = async () => {
    setLoading(true);
    try {
      const { mailingList, REGON, id, ...customer } = data;
      await firestore.doc(`${email}/customers/customers/${id}`).update({
        ...customer,
        ...(REGON ? { REGON } : { REGON: staticFirestore.FieldValue.delete() }),
        mailingList: mailingList.map((item) => item.value)
      });
      enqueueSnackbar('Customer edited', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar('There was a problem', { variant: 'error' });
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

  return <Layout type="edit" name={originalName} handleCancel={handleCancel} handleAction={handleEditCustomer} isLoading={isLoading} />;
};

export default EditCustomer;
