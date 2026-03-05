import { Controller, FieldValues } from "react-hook-form";
import { ITextAreaProps } from "./contract";
import { InputAdornment, TextField } from "@mui/material";

const TextArea = <T extends FieldValues = FieldValues>({
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
  value,
  rows,
  minRows,
  maxRows,
  size = "medium"
}: ITextAreaProps<T>) => (
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
        multiline={true}
        {...field}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        error={!!error}
        helperText={error ? error.message : helperText}
        fullWidth={fullWidth}
        size={size}
        // value={value}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          }
        }}
      />
    )}
  >

  </Controller>
)

export default TextArea;