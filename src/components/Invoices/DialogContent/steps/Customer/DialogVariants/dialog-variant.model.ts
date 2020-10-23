import React from 'react';
import { CustomerForm } from '../../../useDialogForm';

export interface DialogVariantProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: CustomerForm;
  toggleCustomerDialog: () => void;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
