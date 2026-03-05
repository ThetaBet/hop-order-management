import { ICustomer } from "@renderer/utils/types"

export interface CustomerFormData {
  customerCode: string
  customerName: string
  notes?: string
  street?: string
  city?: string
  provinceCode?: string
  zipCode?: string
  country?: string
  neighborhood?: string
  phone: string
  phoneAlt?: string
  email?: string
}

export enum ECustomerFormType {
  ADD = "ADD",
  UPDATE = "UPDATE"
}

export interface ICustomerFormProps {
  customer?: ICustomer
  closeCallback?: () => void
  isUpdating: boolean
  type: ECustomerFormType
  registerSubmit?: (submitFn: () => void, resetFn: () => void) => void
}