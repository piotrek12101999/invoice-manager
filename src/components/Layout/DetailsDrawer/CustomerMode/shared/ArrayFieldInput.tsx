import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

interface Props {
  name: string;
  defaultValue: string;
  register: any;
  label: string;
  error: string | undefined;
  isFirstElement?: boolean;
  handleRemove?: () => void;
  handleAppend?: () => void;
  required?: boolean;
}

const ArrayFieldInput: React.FC<Props> = ({
  defaultValue,
  name,
  register,
  label,
  error,
  isFirstElement,
  handleRemove,
  handleAppend,
  required
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      error={Boolean(error)}
      helperText={error ? error : ' '}
      label={label}
      inputRef={register()}
      defaultValue={defaultValue}
      name={name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!isFirstElement && (
              <IconButton onClick={handleRemove}>
                <RemoveRounded />
              </IconButton>
            )}
            <IconButton onClick={handleAppend}>
              <AddRounded />
            </IconButton>
          </InputAdornment>
        )
      }}
      required={required}
    />
  );
};

export default ArrayFieldInput;
