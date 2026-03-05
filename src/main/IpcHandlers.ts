import { ipcMain } from 'electron'
import { closeEditProductWindow, closeNewProductWindow, openEditProductWindow, openNewProductWindow } from './windowManager/products'
import { MainService } from './service/MainService'
import { IProduct, ISupplier, ICustomer, IDriver, INewOrder } from './service/types'
import { printProducts } from './windowManager/printProducts'
import { printSuppliers } from './windowManager/printSuppliers'
import { closeNewSupplierWindow, openNewSupplierWindow } from './windowManager/suppliers'
import { closeCustomerDetailWindow, closeNewCustomerWindow, openCustomerDetailWindow, openNewCustomerWindow } from './windowManager/customers'
import { printCustomers } from './windowManager/printCustomers'
import { printCustomerDetails } from './windowManager/printCustomerDetails'
import { printDrivers } from './windowManager/printDrivers'
import { printDeliveryDdt } from './windowManager/printDeliveryDdt'
import { closeNewDriverWindow, openNewDriverWindow } from './windowManager/drivers'

const services = MainService.getInstance()

export const setupIpcHandlers = () => {
  ipcMain.handle('database:get-products', (_event: Electron.Event) =>
    services.getProductService().getProducts()
  )
  ipcMain.handle('database:add-product', (_event: Electron.Event, product: IProduct) =>
    services.getProductService().addProduct(product)
  )
  ipcMain.handle('database:update-product-by-code', (_event: Electron.Event, product: IProduct) =>
    services.getProductService().updateProductByCode(product)
  )
  ipcMain.handle('database:delete-product', (_event: Electron.Event, productCode: string) =>
    services.getProductService().deleteProductByCode(productCode)
  )
  ipcMain.handle('database:get-product-by-code', (_event: Electron.Event, productCode: string) =>
    services.getProductService().getProductByCode(productCode)
  )

  ipcMain.handle('database:get-storage-quantity', (_event: Electron.Event, productId: number) =>
    services.getProductService().getStorageQuantity(productId)
  )

  ipcMain.handle('database:get-product-code-count', (_event: Electron.Event, productCode: string) =>
    services.getProductService().getProductCodeCount(productCode)
  )
  ipcMain.handle('databasee:get-products-for-autocomplete', (_event: Electron.Event) =>
    services.getProductService().getProductsForAutocomplete()
  )
  ipcMain.handle('database:get-customers', (_event: Electron.Event) =>
    services.getCustomerService().getCustomers()
  )
  ipcMain.handle('database:add-customer', (_event: Electron.Event, customer: ICustomer) =>
    services.getCustomerService().addCustomer(customer)
  )
  ipcMain.handle(
    'database:update-customer-by-code',
    (_event: Electron.Event, customer: ICustomer) =>
      services.getCustomerService().updateCustomerByCode(customer)
  )
  ipcMain.handle('database:delete-customer', (_event: Electron.Event, customerCode: string) =>
    services.getCustomerService().deleteCustomerByCode(customerCode)
  )
  ipcMain.handle('database:get-customer-by-code', (_event: Electron.Event, customerCode: string, unpaidOnly: boolean) =>
    services.getCustomerService().getCustomerByCode(customerCode, unpaidOnly)
  )
  ipcMain.handle('database:get-customers-for-autocomplete', (_event: Electron.Event) =>
    services.getCustomerService().getCustomersForAutocomplete()
  )
  ipcMain.handle(
    'database:get-customer-payment-status',
    (_event: Electron.Event, customerCode: string) =>
      services.getCustomerService().getCustomerPaymentStatus(customerCode)
  )
  ipcMain.handle(
    'database:get-customer-complete-payment-status',
    (_event: Electron.Event, customerCode: string) =>
      services.getCustomerService().getCustomerCompletePaymentStatus(customerCode)
  )
  ipcMain.handle(
    'database:get-customer-unpaid-orders-status',
    (_event: Electron.Event, customerCode: string) =>
      services.getCustomerService().getCustomerUnpaidOrdersStatus(customerCode)
  )
  ipcMain.handle('database:get-suppliers', (_event: Electron.Event) =>
    services.getSupplierService().getSuppliers()
  )
  ipcMain.handle('database:add-supplier', (_event: Electron.Event, supplier: ISupplier) =>
    services.getSupplierService().addSupplier(supplier)
  )
  ipcMain.handle(
    'database:update-supplier-by-code',
    (_event: Electron.Event, supplier: ISupplier) =>
      services.getSupplierService().updateSupplier(supplier)
  )
  ipcMain.handle('database:delete-supplier', (_event: Electron.Event, supplierCode: string) =>
    services.getSupplierService().deleteSupplier(supplierCode)
  )
  ipcMain.handle('database:get-supplier-by-code', (_event: Electron.Event, supplierCode: string) =>
    services.getSupplierService().getSupplierByCode(supplierCode)
  )
  ipcMain.handle('database:get-supplier-code-count', (_event: Electron.Event, supplierCode: string) =>
    services.getSupplierService().getSupplierCodeCount(supplierCode)
  )
  ipcMain.handle('database:get-orders', (_event: Electron.Event, startDate: Date, endDate: Date, unpaidOnly: boolean) =>
    services.getOrderService().getOrders(startDate, endDate, unpaidOnly)
  )
  ipcMain.handle('database:get-order-by-order-number', (_event: Electron.Event, orderNumber: number) =>
    services.getOrderService().getOrderByOrderNumber(orderNumber)
  )
  ipcMain.handle('database:update-order-payment-status', (_event: Electron.Event, orderNumber: number, paymentStatus: boolean) =>
    services.getOrderService().updateOrderPaymentStatus(orderNumber, paymentStatus)
  )

  ipcMain.handle('database:update-storage-quantity', (_event: Electron.Event, productId: number, quantity: number) =>
    services.getProductService().updateStorageQuantity(productId, quantity)
  )
  ipcMain.handle('database:update-order-delivery-status', (_event: Electron.Event, orderNumber: number, deliveryStatus: boolean) =>
    services.getOrderService().updateOrderDeliveryStatus(orderNumber, deliveryStatus)
  )
  ipcMain.handle('database:delete-order', (_event: Electron.Event, orderNumber: number) =>
    services.getOrderService().deleteOrder(orderNumber)
  )
  ipcMain.handle('database:add-order', (_event: Electron.Event, order: INewOrder) =>
    services.getOrderService().addOrder(order)
  )
  ipcMain.handle('database:get-last-order-number', (_event: Electron.Event) =>
    services.getOrderService().getLastOrderNumber()
  )

  // ipcMain.handle('database:get-orders-brief', (_event: Electron.Event) =>
  //   services.getOrderService().getOrdersBrief()
  // )
  // ipcMain.handle(
  //   'database:get-orders-by-customer-id',
  //   (_event: Electron.Event, customerId: number) =>
  //     services.getOrderService().getOrdersByCustomerId(customerId)
  // )
  // ipcMain.handle('database:add-order', (_event: Electron.Event, order: IOrderData) =>
  //   services.getOrderService().addOrder(order)
  // )
  // ipcMain.handle(
  //   'database:update-order',
  //   (_event: Electron.Event, order: IOrderData, orderId: number) =>
  //     services.getOrderService().updateOrder(orderId, order)
  // )
  // ipcMain.handle('database:delete-order', (_event: Electron.Event, orderId: number) =>
  //   services.getOrderService().deleteOrder(orderId)
  // )
  // ipcMain.handle('database:get-order-by-id', (_event: Electron.Event, orderId: number) =>
  //   services.getOrderService().getOrderById(orderId)
  // )
  // ipcMain.handle('database:get-orders-count', (_event: Electron.Event) =>
  //   services.getOrderService().getOrdersCount()
  // )
  // ipcMain.handle('database:get-detailed-order-by-id', (_event: Electron.Event, orderId: number) =>
  //   services.getOrderService().getDetailedOrderById(orderId)
  // )
  // ipcMain.handle('database:getDetailedOrders', (_event: Electron.Event) =>
  //   services.getOrderService().getDetailedOrders()
  // )
  ipcMain.handle('database:get-customer-code-count', (_event: Electron.Event, customerCode: string) =>
    services.getCustomerService().getCustomerCodeCount(customerCode)
  )
  ipcMain.handle('database:get-drivers', (_event: Electron.Event) =>
    services.getDriverService().getDrivers()
  )
  ipcMain.handle('database:add-driver', (_event: Electron.Event, driver: IDriver) =>
    services.getDriverService().addDriver(driver)
  )
  ipcMain.handle(
    'database:update-driver',
    (_event: Electron.Event, driver: IDriver) =>
      services.getDriverService().updateDriver(driver)
  )
  ipcMain.handle('database:delete-driver', (_event: Electron.Event, driverCode: string) =>
    services.getDriverService().deleteDriver(driverCode)
  )
  ipcMain.handle('database:get-driver-by-code', (_event: Electron.Event, driverCode: string) =>
    services.getDriverService().getDriverByCode(driverCode)
  )
  ipcMain.handle('database:get-driver-code-count', (_event: Electron.Event, driverCode: string) =>
    services.getDriverService().getDriverCodeCount(driverCode)
  )
}

export const setupWindowHandlers = (mainWindowRef: Function) => {
  ipcMain.handle('open-edit-product-window', (_event: Electron.Event, productCode: string) => {
    openEditProductWindow(mainWindowRef(), productCode)
  });
  ipcMain.handle('open-new-product-window', (_event: Electron.Event) => {
    openNewProductWindow(mainWindowRef())
  });
  ipcMain.handle('close-edit-product-window', () => {
    closeEditProductWindow()
  });
  ipcMain.handle('close-new-product-window', () => {
    closeNewProductWindow()
  });
  ipcMain.handle('close-new-supplier-window', () => {
    closeNewSupplierWindow()
  });
  ipcMain.handle('open-new-supplier-window', (_event: Electron.Event, supplierId: string) => {
    openNewSupplierWindow(mainWindowRef(), supplierId)
  });

  ipcMain.handle('open-new-customer-window', (_event: Electron.Event) => {
    openNewCustomerWindow(mainWindowRef())
  });

  ipcMain.handle('close-new-customer-window', () => {
    closeNewCustomerWindow()
  });

  ipcMain.handle('open-customer-detail-window', (_event: Electron.Event, customerId: number) => {
    openCustomerDetailWindow(mainWindowRef(), customerId)
  });

  ipcMain.handle('close-customer-detail-window', () => {
    closeCustomerDetailWindow()
  });

  ipcMain.handle('open-new-driver-window', (_event: Electron.Event, driverId: string) => {
    openNewDriverWindow(mainWindowRef(), driverId)
  });

  ipcMain.handle('close-new-driver-window', () => {
    closeNewDriverWindow()
  });


  ipcMain.handle('close-main-window', () => {
    const mainWindow = mainWindowRef()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.close()
    }
  });

  ipcMain.handle('minimize-main-window', () => {
    const mainWindow = mainWindowRef()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.minimize()
    }
  });

  ipcMain.handle('maximize-main-window', () => {
    const mainWindow = mainWindowRef()
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  });

  ipcMain.on('invalidate-queries', (_event: Electron.Event, queryType: string) => {
    const mainWindow = mainWindowRef()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('queries-invalidated', queryType)
    }
  })
}

export const setupPrintHandlers = () => {
  ipcMain.handle('print:print-products', (_event: Electron.Event, products: IProduct[]) => {
    printProducts(products)
  });
  ipcMain.handle('print:print-suppliers', (_event: Electron.Event, suppliers: ISupplier[]) => {
    printSuppliers(suppliers)
  });
  ipcMain.handle('print:print-customers', (_event: Electron.Event, customers: ICustomer[]) => {
    printCustomers(customers)
  });
  ipcMain.handle('print:print-customer-details', (_event: Electron.Event, customerCode: string, unpaidOnly: boolean) => {
    const customer = services.getCustomerService().getCustomerByCode(customerCode, unpaidOnly);
    printCustomerDetails(customer)
  });
  ipcMain.handle('print:print-drivers', (_event: Electron.Event, drivers: IDriver[]) => {
    printDrivers(drivers)
  });
  ipcMain.handle('print:print-delivery-ddt', (_event: Electron.Event, driverGroups: any[]) => {
    const orderService = services.getOrderService()
    const enrichedGroups = driverGroups.map((group) => ({
      ...group,
      orders: group.orders.map((order: any) => {
        if (order.orderNumber) {
          const detailed = orderService.getOrderByOrderNumber(order.orderNumber)
          if (detailed) return detailed
        }
        return order
      })
    }))
    printDeliveryDdt(enrichedGroups)
  });
}
