import React from 'react';
import {
  Checkbox,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from '@material-ui/core';
import StyledLine from '../../../../shared/StyledLine/StyledLine';
import { ExpensesNotifications as NotificationsModel, ExpensesNotificationsTypes } from '../../../../../contexts/data/data.models';

interface Props {
  data: NotificationsModel;
  toggleNotification: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleExpensesDetailsChange: (type: ExpensesNotificationsTypes) => Promise<void>;
  handleExpensesDateChange: (date: string) => Promise<void>;
}

const radioTypes = [
  { value: 'last', label: 'On last day of the month' },
  { value: 'first', label: 'On first day of the month' },
  { value: 'custom', label: 'Custom' }
];

const ExpensesNotifications: React.FC<Props> = ({
  data: { type, date, enabled },
  toggleNotification,
  handleExpensesDateChange,
  handleExpensesDetailsChange
}) => {
  const handleRadioGroupChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    handleExpensesDetailsChange(value as ExpensesNotificationsTypes);

  const handleDateInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Math.abs(parseInt(value));
    if (parsedValue >= 1 && parsedValue <= 30) {
      handleExpensesDateChange(value);
    }
  };

  return (
    <Accordion expanded={enabled} classes={{ root: 'expenses-panel' }}>
      <AccordionSummary classes={{ root: 'summary' }}>
        <div className="summary-details">
          <p className="description">Mail with expenses is being sent</p>
          <Checkbox color="primary" onChange={toggleNotification} checked={enabled} style={{ height: 42 }} />
        </div>
      </AccordionSummary>
      <AccordionDetails classes={{ root: 'details' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">When email is sent?</FormLabel>
          <RadioGroup value={type} onChange={handleRadioGroupChange}>
            {radioTypes.map(({ label, value }, index) => (
              <FormControlLabel key={index} value={value} control={<Radio />} label={label} />
            ))}
          </RadioGroup>
        </FormControl>
        {type === 'custom' && (
          <div className="custom-days-details">
            <span className="before-input"> Send it each </span>
            <TextField
              variant="outlined"
              onChange={handleDateInputChange}
              value={date}
              inputProps={{ min: 1, max: 30 }}
              size="small"
              type="number"
            />
            <span className="after-input"> day of the month </span>
          </div>
        )}
        <StyledLine className="line" />
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpensesNotifications;
