import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import DatePicker from '../../../../shared/DatePicker/DatePicker';
import Input from '../../../../shared/Input/Input';
import FileUpload from './FileUpload';

export interface FormFields {
  name: string;
  price: string;
  purchaseDate: Date;
}

export interface DbFile {
  name: string;
  size: number;
}

interface Props {
  handleSubmit: () => void;
  register: any;
  control: Control<FormFields>;
  file?: File | null;
  dbFile?: DbFile;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  closeDrawer: () => void;
  isLoading: boolean;
}

const Form: React.FC<Props> = ({ handleSubmit, register, file, dbFile, setFile, control, closeDrawer, isLoading }) => {
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input name="name" label="Name" register={register} required />
      <Input name="price" type="number" step={0.01} label="Price" register={register} required />
      <Controller
        // Date picker requires onChange method which in this case is handled by react-hook-form Controller
        as={<DatePicker value={control.getValues().purchaseDate || new Date()} onChange={() => {}} required />}
        control={control}
        name="purchaseDate"
        label="Purchase date"
      />
      <FileUpload file={file} dbFile={dbFile} setFile={setFile} />
      <div className="buttons">
        <Button color="primary" type="button" onClick={closeDrawer} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default Form;
