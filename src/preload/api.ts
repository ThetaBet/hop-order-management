import { ipcRenderer } from 'electron'
import { IDatabaseAPI, IWindowAPI, IUpdaterAPI } from './types'
import { IProduct } from '../main/service/types'

export const database: IDatabaseAPI = {
  getProducts: () => ipcRenderer.invoke('database:get-products'),
  addProduct: (product) => ipcRenderer.invoke('database:add-product', product),
  deleteProduct: (productCode) => ipcRenderer.invoke('database:delete-product', productCode),
  getProductByCode: (productCode) =>
    ipcRenderer.invoke('database:get-product-by-code', productCode),
  updateProductByCode: (product) => ipcRenderer.invoke('database:update-product-by-code', product),
  getProductCodeCount: (productCode) =>
    ipcRenderer.invoke('database:get-product-code-count', productCode),
  getSuppliers: () => ipcRenderer.invoke('database:get-suppliers'),
  deleteSupplier: (supplierCode) => ipcRenderer.invoke('database:delete-supplier', supplierCode),
  updateSupplierByCode: (supplier) =>
    ipcRenderer.invoke('database:update-supplier-by-code', supplier),
  addSupplier: (supplier) => ipcRenderer.invoke('database:add-supplier', supplier),
  getSupplierCodeCount: (supplierCode) =>
    ipcRenderer.invoke('database:get-supplier-code-count', supplierCode),
  getCustomers: () => ipcRenderer.invoke('database:get-customers'),
  deleteCustomer: (customerCode) => ipcRenderer.invoke('database:delete-customer', customerCode),
  addCustomer: (customer) => ipcRenderer.invoke('database:add-customer', customer),
  updateCustomerByCode: (customer) =>
    ipcRenderer.invoke('database:update-customer-by-code', customer),
  getCustomerByCode: (customerCode, unpaidOnly) =>
    ipcRenderer.invoke('database:get-customer-by-code', customerCode, unpaidOnly),
  getCustomerPaymentStatus: (customerCode) =>
    ipcRenderer.invoke('database:get-customer-payment-status', customerCode),
  getCustomerCompletePaymentStatus: (customerCode) =>
    ipcRenderer.invoke('database:get-customer-complete-payment-status', customerCode),
  getCustomerUnpaidOrdersStatus: (customerCode) =>
    ipcRenderer.invoke('database:get-customer-unpaid-orders-status', customerCode),
  getCustomerCodeCount: (customerCode) =>
    ipcRenderer.invoke('database:get-customer-code-count', customerCode),
  getCustomersForAutocomplete: () => ipcRenderer.invoke('database:get-customers-for-autocomplete'),
  getProductsForAutocomplete: () => ipcRenderer.invoke('databasee:get-products-for-autocomplete'),
  getStorageQuantity: (productId: number) => ipcRenderer.invoke('database:get-storage-quantity', productId),
    updateStorageQuantity: (productId: number, quantity: number) => ipcRenderer.invoke('database:update-storage-quantity', productId, quantity),
  getDrivers: () => ipcRenderer.invoke('database:get-drivers'),
  addDriver: (driver) => ipcRenderer.invoke('database:add-driver', driver),
  updateDriver: (driver) => ipcRenderer.invoke('database:update-driver', driver),
  deleteDriver: (driverCode) => ipcRenderer.invoke('database:delete-driver', driverCode),
  getDriverByCode: (driverCode) => ipcRenderer.invoke('database:get-driver-by-code', driverCode),
  getDriverCodeCount: (driverCode) =>
    ipcRenderer.invoke('database:get-driver-code-count', driverCode),
  getOrders: (startDate, endDate, unpaidOnly) => ipcRenderer.invoke('database:get-orders', startDate, endDate, unpaidOnly),
  getOrderByOrderNumber: (orderNumber) => ipcRenderer.invoke('database:get-order-by-order-number', orderNumber),
  updateOrderPaymentStatus: (orderNumber, paymentStatus) => ipcRenderer.invoke('database:update-order-payment-status', orderNumber, paymentStatus),
  updateOrderDeliveryStatus: (orderNumber, deliveryStatus) => ipcRenderer.invoke('database:update-order-delivery-status', orderNumber, deliveryStatus),
  deleteOrder: (orderNumber) => ipcRenderer.invoke('database:delete-order', orderNumber),
  addOrder: (order) => ipcRenderer.invoke('database:add-order', order),
  getLastOrderNumber: () => ipcRenderer.invoke('database:get-last-order-number'),
}

export const windowAPI: IWindowAPI = {
  closeMainWindow: () => ipcRenderer.invoke('close-main-window'),
  minimizeMainWindow: () => ipcRenderer.invoke('minimize-main-window'),
  maximizeMainWindow: () => ipcRenderer.invoke('maximize-main-window'),
  openNewProductWindow: () => ipcRenderer.invoke('open-new-product-window'),
  openNewSupplierWindow: (supplierCode) => ipcRenderer.invoke('open-new-supplier-window', supplierCode),
  closeNewSupplierWindow: () => ipcRenderer.invoke('close-new-supplier-window'),
  closeNewProductWindow: () => ipcRenderer.invoke('close-new-product-window'),
  invalidateQueries: async (queryType) => ipcRenderer.send('invalidate-queries', queryType),
  onQueriesInvalidated: (callback) => {
    ipcRenderer.removeAllListeners('queries-invalidated')
    const handler = (_event, queryType) => callback(queryType)
    ipcRenderer.on('queries-invalidated', handler)
    return () => ipcRenderer.removeListener('queries-invalidated', handler)
  },
  openNewCustomerWindow: () => ipcRenderer.invoke('open-new-customer-window'),
  closeNewCustomerWindow: () => ipcRenderer.invoke('close-new-customer-window'),
  openCustomerDetailWindow: (customerId) => ipcRenderer.invoke('open-customer-detail-window', customerId),
  closeCustomerDetailWindow: () => ipcRenderer.invoke('close-customer-detail-window'),
  openNewDriverWindow: () => ipcRenderer.invoke('open-new-driver-window'),
  closeNewDriverWindow: () => ipcRenderer.invoke('close-new-driver-window'),
  openEditProductWindow: (productCode) => ipcRenderer.invoke('open-edit-product-window', productCode),
  closeEditProductWindow: () => ipcRenderer.invoke('close-edit-product-window'),
}

export const printAPI = {
  printProducts: (products: IProduct[]) => ipcRenderer.invoke('print:print-products', products),
  printSuppliers: (suppliers: any[]) => ipcRenderer.invoke('print:print-suppliers', suppliers),
  printCustomers: (customers: any[]) => ipcRenderer.invoke('print:print-customers', customers),
  printCustomerDetails: (customer: string) => ipcRenderer.invoke('print:print-customer-details', customer),
  printDrivers: (drivers: any[]) => ipcRenderer.invoke('print:print-drivers', drivers),
  printDeliveryDdt: (driverGroups: any[]) => ipcRenderer.invoke('print:print-delivery-ddt', driverGroups),
}

export const updaterAPI: IUpdaterAPI = {
  checkForUpdates: () => ipcRenderer.invoke('updater:check'),
  downloadUpdate: () => ipcRenderer.invoke('updater:download'),
  installUpdate: () => ipcRenderer.invoke('updater:install'),
  onStatusChange: (callback) => {
    ipcRenderer.removeAllListeners('updater:status')
    const handler = (_event, status) => callback(status)
    ipcRenderer.on('updater:status', handler)
    return () => ipcRenderer.removeListener('updater:status', handler)
  },
}
