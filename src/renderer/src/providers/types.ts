import { ICustomer, IDetailedCustomer, IDetailedOrder, IDriver, IOrder, IProduct, ISupplier } from '@renderer/utils/types'

export interface IProductsProviderContext {
  products: IProduct[]
  refetch: () => Promise<void>
  isLoading: boolean
  error: Error | null
}

export interface ISupplierProviderContext {
  suppliers: ISupplier[]
  isLoading: boolean
  error: Error | null
}

export interface ICustomersProviderContext {
  customers: ICustomer[]
  isLoading: boolean
  error: Error | null
}

export interface ICustomerProviderContext {
  customer: IDetailedCustomer | null
  isLoading: boolean
  error: Error | null
  unpaidOnly: boolean
  setIsUnpaidOnly: (unpaidOnly: boolean) => void
}

export interface IProductProviderContext {
  product: IProduct | null
  isLoading: boolean
  error: Error | null
}

export interface ISelectedProductsContext {
  selectedProducts: IProduct[]
  setSelectedProducts: (products: IProduct[]) => void
}

export interface ISelectedSuppliersContext {
  selectedSuppliers: ISupplier[]
  setSelectedSuppliers: (suppliers: ISupplier[]) => void
}

export interface ISelectedCustomersContext {
  selectedCustomers: ICustomer[]
  setSelectedCustomers: (customers: ICustomer[]) => void
}

export interface ISelectedDriversContext {
  selectedDrivers: IDriver[]
  setSelectedDrivers: (drivers: IDriver[]) => void
}

export interface IEditCustomerContext {
  isEditing: boolean
  toggleEditing: (editing: boolean) => void
  registerSubmit: (submitFn: () => void, resetFn: () => void) => void
  handleSubmit: () => void
  customerCode: string
}

export interface IDriversProviderContext {
  drivers: IDriver[]
  isLoading: boolean
  error: Error | null
}

export interface IOrdersProviderContext {
  orders: IOrder[]
  isLoading: boolean
  error: Error | null
  setDates: (dates: { startDate?: Date; endDate?: Date }) => void
  dates: { startDate?: Date; endDate?: Date }
  unpaidOnly: boolean
  setUnpaidOnly: (unpaidOnly: boolean) => void
}

export interface IOrderProviderContext {
  order: IDetailedOrder | null
  isLoading: boolean
  error: Error | null
}