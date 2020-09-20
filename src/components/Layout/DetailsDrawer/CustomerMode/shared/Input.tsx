import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

interface Props {
  label: string;
  name: string;
  required?: boolean;
  register: () => void;
  error?: string;
  isMailingList?: boolean;
  handleApend?: () => void;
  handleRemove?: () => void;
  isFirstArrayElement?: boolean;
  defaultValue?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  required,
  register,
  error,
  isMailingList,
  handleApend,
  handleRemove,
  isFirstArrayElement,
  defaultValue
}) => (
  <TextField
    className="input"
    size="small"
    inputRef={register}
    variant="outlined"
    label={label}
    name={name}
    type="text"
    required={required}
    error={Boolean(error)}
    helperText={error ? error : ' '}
    defaultValue={defaultValue}
    InputProps={{
      ...(isMailingList && {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleApend}>
              <AddRounded />
            </IconButton>
            {!isFirstArrayElement && (
              <IconButton onClick={handleRemove}>
                <RemoveRounded />
              </IconButton>
            )}
          </InputAdornment>
        )
      })
    }}
  />
);

export default Input;
