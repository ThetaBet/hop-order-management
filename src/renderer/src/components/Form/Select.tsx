import { Controller, FieldValues } from 'react-hook-form'
import { ISelectProps } from './contract'
import { MenuItem, TextField } from '@mui/material'

const Select = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  error,
  helperText,
  fullWidth,
  options,
  size
}: ISelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: required ? 'Questo campo è obbligatorio' : false
    }}
    render={({ field }) => (
      <TextField
        {...field}
        select
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={!!error}
        helperText={error ? error.message : helperText}
        fullWidth={fullWidth}
        size={size}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)

export default Select
