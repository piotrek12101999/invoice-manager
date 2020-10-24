import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

interface Props {
  name: string;
  isAutoComplete?: boolean;
  autoCompleteProps?: any;
  label?: string;
  required?: boolean;
  isMailingList?: boolean;
  handleAppend?: () => void;
  handleRemove?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFirstArrayElement?: boolean;
  error?: string;
  register?: any;
  type?: string;
  disabled?: boolean;
  isController?: boolean;
  control?: Control<Record<string, any>>;
  defaultValue?: string;
  value?: string;
  multiline?: boolean;
  fullWidth?: boolean;
  step?: number;
  rows?: number;
}

const Input: React.FC<Props> = ({
  label,
  required,
  isAutoComplete,
  autoCompleteProps,
  isController,
  control,
  name,
  error,
  defaultValue,
  isMailingList,
  isFirstArrayElement,
  register,
  disabled,
  handleAppend,
  handleRemove,
  value,
  onChange,
  rows,
  multiline,
  fullWidth,
  step,
  type = 'text'
}) => {
  const sharedProps = {
    variant: 'outlined',
    label,
    required,
    disabled,
    fullWidth,
    error: Boolean(error),
    helperText: error ? error : ' ',
    InputProps: {
      ...(isMailingList && {
        endAdornment: (
          <InputAdornment position="end">
            {!isFirstArrayElement && (
              <IconButton onClick={handleRemove}>
                <RemoveRounded />
              </IconButton>
            )}
            <IconButton onClick={handleAppend}>
              <AddRounded />
            </IconButton>
          </InputAdornment>
        )
      })
    },
    type,
    inputProps: { ...(type === 'number' && { step }) },
    ...(isAutoComplete && { ...autoCompleteProps }),
    rows,
    multiline,
    size: 'small'
  };

  return isController ? (
    <Controller as={<TextField {...sharedProps} />} name={name} control={control} defaultValue={defaultValue || ''} />
  ) : (
    <TextField {...sharedProps} name={name} onChange={onChange} inputRef={register} value={value} defaultValue={defaultValue} />
  );
};

export default Input;
