import { Controller, FieldValues } from "react-hook-form";
import { Autocomplete as MuiAutoComplete, TextField } from "@mui/material";
import { IAutoCompleteProps } from "./contract";
const AutoComplete = <T extends FieldValues = FieldValues>({
  name,
  control,
  fullWidth,
  loading,
  label,
  options,
  required,
  error,
  rules,
  readOnly,
  onOptionChange,
  size = "medium",
}: IAutoCompleteProps<T>) => (
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
    render={({ field, fieldState }) => (
      <MuiAutoComplete
        {...field}
        onChange={(_, option) => {
          field.onChange(option);
          onOptionChange && onOptionChange(option);
        }}
        fullWidth={fullWidth}
        loading={loading}
        size={size}
        readOnly={readOnly}
        renderInput={(params) => (
          <TextField
            error={!!fieldState.error || !!error?.message}
            helperText={fieldState.error?.message ?? error?.message ?? ''}
            required={required}
            {...params}
            label={label}
          />
        )}
        options={options}
      />
    )}
  />
)

export default AutoComplete