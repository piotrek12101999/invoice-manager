import React from 'react';
import { UseFormMethods } from 'react-hook-form';
import { BasicDataForm, DetailsForm, ProductsForm } from '../useDialogForm';
import { Form as CustomerForm } from '../../CustomerMode/shared/customerTypes';

export interface StepComponent<T extends BasicDataForm | CustomerForm | ProductsForm | DetailsForm> {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormMethods<T>;
}
