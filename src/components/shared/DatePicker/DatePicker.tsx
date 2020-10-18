import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props {
  value: Date;
  onChange: (event: MaterialUiPickersDate) => void;
  label?: string;
}

const DatePicker: React.FC<Props> = ({ value, onChange, label }) => (
  <KeyboardDatePicker value={value} onChange={onChange} label={label} autoOk format="dd/MM/yyyy" margin="dense" inputVariant="outlined" />
);

export default DatePicker;
