import { Controller, FieldValues } from "react-hook-form";
import { IDatePickerProps } from "./contract";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePicker = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  error,
  fullWidth,
  minDate,
  maxDate,
  disablePast,
  disableFuture
}: IDatePickerProps<T>) => (
  <Controller
    
    name={name}
    control={control}
    rules={{
      required: required ? 'Questo campo è obbligatorio' : false,
    }}
    render={({ field }) => (
      <MuiDatePicker
        {...field}
        label={label}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        sx={{
          width: fullWidth ? '100%' : 'auto',
        }}
        slotProps={{
          textField: {
            helperText: error?.message || ''
          }
        }}
      />
    )}
  />
);

export default DatePicker;