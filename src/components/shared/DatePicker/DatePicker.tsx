import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props {
  value: Date;
  onChange: (event: MaterialUiPickersDate) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const DatePicker: React.FC<Props> = ({ value, onChange, label, required, disabled }) => (
  <KeyboardDatePicker
    value={value}
    onChange={onChange}
    label={label}
    autoOk
    format="dd/MM/yyyy"
    margin="dense"
    inputVariant="outlined"
    required={required}
    disabled={disabled}
  />
);

export default DatePicker;
