import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

interface Props {
  control: Control<Record<string, any>>;
  name: string;
  label: string;
  defaultValue?: string;
  isMailingList?: boolean;
  handleAppend?: () => void;
  handleRemove?: () => void;
}

const Input: React.FC<Props> = ({ control, name, label, defaultValue, isMailingList, handleAppend, handleRemove }) => (
  <Controller
    as={
      <TextField
        className="input"
        size="small"
        variant="outlined"
        type="text"
        label={label}
        InputProps={{
          ...(isMailingList && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAppend}>
                  <AddRounded />
                </IconButton>
                <IconButton onClick={handleRemove}>
                  <RemoveRounded />
                </IconButton>
              </InputAdornment>
            )
          })
        }}
      />
    }
    name={name}
    control={control}
    defaultValue={defaultValue || ''}
  />
);

export default Input;
