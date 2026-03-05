import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { JSX } from 'react'

export interface IInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  rules?: RegisterOptions<T, Path<T>>
  error?: {
    message?: string
    type?: string
  }
  helperText?: string
  fullWidth?: boolean
  startAdornment?: string | JSX.Element
  endAdornment?: string | JSX.Element
  readOnly?: boolean
  value?: string | number
  type?: string
  multiline?: boolean
  rows?: number
  minRows?: number
  maxRows?: number
  size?: "small" | "medium"
}

export interface ITextAreaProps<T extends FieldValues = FieldValues> extends IInputProps<T> {
  rows?: number
  minRows?: number
  maxRows?: number
}

export interface ISelectProps<T extends FieldValues = FieldValues> extends IInputProps<T> {
  defaultValue?: {
    value: string | number
    label: string
  }
  options: Array<{
    value: string | number | undefined
    label: string
  }>
}

export interface IDatePickerProps<T extends FieldValues = FieldValues> extends Omit<IInputProps<T>, 'value'> {
  minDate?: Date
  maxDate?: Date
  value?: Date
  disablePast?: boolean
  disableFuture?: boolean
}

export interface IAutoCompleteProps<T extends FieldValues = FieldValues> extends IInputProps<T> {
  options: Array<{
    value: string | number | undefined
    label: string
    id?: string | number
    Key?: string | number
  }>
  onOptionChange?: (option: unknown) => void
  loading?: boolean
}