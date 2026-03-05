import { ICustomerBriefPaymentStatus, ICustomerCompletePaymentStatus, ICustomerPaymentStatus } from '../main/database/types'
import { IProduct, ICustomer, IDriver, IOrder, IDetailedOrder, IDetailedCustomer, INewOrder } from '../main/service/types'

export interface IDatabaseAPI {
  getProducts: () => Promise<IProduct[]>
  addProduct: (product: Partial<IProduct>) => Promise<void>
  deleteProduct: (productCode: string) => Promise<void>
  getProductByCode: (productCode: string) => Promise<IProduct | undefined>
  updateProductByCode: (product: Partial<IProduct>) => Promise<void>
  getProductCodeCount: (productCode: string) => Promise<number>
  getSuppliers: () => Promise<any>
  deleteSupplier: (supplierCode: string) => Promise<void>
  updateSupplierByCode: (supplier: any) => Promise<void>
  addSupplier: (supplier: any) => Promise<void>
  getSupplierCodeCount: (supplierCode: string) => Promise<number>
  getCustomers: () => Promise<ICustomer[]>
  deleteCustomer: (customerCode: string) => Promise<void>
  addCustomer: (customer: Partial<ICustomer>) => Promise<void>
  updateCustomerByCode: (customer: Partial<ICustomer>) => Promise<void>
  getCustomerByCode: (customerCode: string, unpaidOnly: boolean) => Promise<IDetailedCustomer | undefined>
  getCustomerPaymentStatus: (customerCode: string) => Promise<ICustomerPaymentStatus>
  getCustomerCompletePaymentStatus: (customerCode: string) => Promise<ICustomerCompletePaymentStatus>
  getCustomerUnpaidOrdersStatus: (customerCode: string) => Promise<ICustomerBriefPaymentStatus>
  getCustomerCodeCount: (customerCode: string) => Promise<number>
  getDrivers: () => Promise<IDriver[]>
  addDriver: (driver: Partial<IDriver>) => Promise<void>
  updateDriver: (driver: Partial<IDriver>) => Promise<void>
  deleteDriver: (driverCode: string) => Promise<void>
  getDriverByCode: (driverCode: string) => Promise<IDriver | undefined>
  getDriverCodeCount: (driverCode: string) => Promise<number>
  getOrders: (startDate?: Date, endDate?: Date, unpaidOnly?: boolean) => Promise<IOrder[]>
  getOrderByOrderNumber: (orderNumber: number) => Promise<IDetailedOrder | undefined>
  updateOrderPaymentStatus: (orderNumber: number, paymentStatus: boolean) => Promise<void>
  updateOrderDeliveryStatus: (orderNumber: number, deliveryStatus: boolean) => Promise<void>
  deleteOrder: (orderNumber: number) => Promise<void>
  addOrder: (order: INewOrder) => Promise<void>
  getCustomersForAutocomplete: () => Promise<ICustomer[]>
  getProductsForAutocomplete: () => Promise<IProduct[]>
  getLastOrderNumber: () => Promise<number>
  getStorageQuantity: (productId: number) => Promise<number>
  updateStorageQuantity: (productId: number, quantity: number) => Promise<void>
}

export interface IWindowAPI {
  closeMainWindow: () => Promise<void>
  minimizeMainWindow: () => Promise<void>
  maximizeMainWindow: () => Promise<void>
  openNewProductWindow: (productCode?: string) => Promise<void>
  closeNewProductWindow: () => Promise<void>
  openNewSupplierWindow: (supplierCode?: string) => Promise<void>
  closeNewSupplierWindow: () => Promise<void>
  invalidateQueries: (queryType: string) => Promise<void>
  onQueriesInvalidated: (callback: (queryType: string) => void) => () => void
  openNewCustomerWindow: () => Promise<void>
  closeNewCustomerWindow: () => Promise<void>
  openCustomerDetailWindow: (customerCode: string) => Promise<void>
  closeCustomerDetailWindow: () => Promise<void>
  openNewDriverWindow: () => Promise<void>
  closeNewDriverWindow: () => Promise<void>
  openEditProductWindow: (productCode: string) => Promise<void>
  closeEditProductWindow: () => Promise<void>
}

export interface IPrintAPI {
  printProducts: (products: IProduct[]) => Promise<void>,
  printSuppliers: (suppliers: any[]) => Promise<void>,
  printCustomers: (customers: ICustomer[]) => Promise<void>,
  printCustomerDetails: (customer: string) => Promise<void>,
  printDrivers: (drivers: IDriver[]) => Promise<void>,
  printDeliveryDdt: (driverGroups: any[]) => Promise<void>,
}

export type UpdateStatus =
  | { type: 'checking' }
  | { type: 'available'; version: string; releaseNotes?: string }
  | { type: 'not-available' }
  | { type: 'downloading'; percent: number; transferred: number; total: number }
  | { type: 'downloaded'; version: string }
  | { type: 'error'; message: string }

export interface IUpdaterAPI {
  /** Controlla manualmente la presenza di aggiornamenti */
  checkForUpdates: () => Promise<void>
  /** Scarica l'aggiornamento disponibile */
  downloadUpdate: () => Promise<void>
  /** Installa l'aggiornamento scaricato e riavvia */
  installUpdate: () => Promise<void>
  /** Ascolta i cambiamenti di stato dell'updater; restituisce la funzione di cleanup */
  onStatusChange: (callback: (status: UpdateStatus) => void) => () => void
}
