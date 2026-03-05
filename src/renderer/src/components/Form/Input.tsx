import { TextField, InputAdornment } from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'
import { IInputProps } from './contract'

const Input = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  rules,
  error,
  helperText,
  fullWidth,
  startAdornment,
  endAdornment,
  readOnly,
  type,
  multiline,
  rows,
  minRows,
  maxRows,
  size = "medium"
}: IInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: required ? 'Questo campo è obbligatorio' : false,
      pattern: rules?.pattern,
      minLength: rules?.minLength,
      maxLength: rules?.maxLength,
      validate: rules?.validate,
      min: rules?.min,
      max: rules?.max
    }}
    render={({ field }) => (
      <TextField
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        multiline={multiline}
        type={type}
        {...field}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={!!error}
        helperText={error ? error.message : helperText}
        fullWidth={fullWidth}
        size={size}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
            readOnly: readOnly || false
          },
          inputLabel: {
            shrink: !!field.value
          }        
        }}
      />
    )}
  />
)

export default Input
