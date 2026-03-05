import log from '../logger'
import {
  ICustomer,
  ICustomerBriefPaymentStatus,
  ICustomerCompletePaymentStatus,
  ICustomerPaymentStatus,
  IDetailedCustomer,
  IDriver,
  IOrder,
  IOrderBrief,
  IOrderRow,
  IOrderWithDetails,
  IProduct,
  ISupplier
} from './types'
import { DatabaseConnection } from './DatabaseConnection'
import {
  CustomerRepository,
  OrderRepository,
  ProductRepository,
  SupplierRepository
} from './repositories'
import { driverRepository } from './repositories/DriverRepository'

export default class DB {
  private databaseConnection: DatabaseConnection
  private supplierRepository: SupplierRepository
  private customerRepository: CustomerRepository
  private productRepository: ProductRepository
  private orderRepository: OrderRepository
  private driverRepository: driverRepository

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance()
    this.supplierRepository = new SupplierRepository()
    this.customerRepository = new CustomerRepository()
    this.productRepository = new ProductRepository()
    this.orderRepository = new OrderRepository()
    this.driverRepository = new driverRepository()
    log.database('DB class initialized with repository pattern')
  }

  quit() {
    this.databaseConnection.quit()
  }

  getSuppliers(): ISupplier[] {
    return this.supplierRepository.getSuppliers()
  }

  addSupplier(supplier: Partial<ISupplier>): void {
    this.supplierRepository.addSupplier(supplier)
  }

  updateSupplier(supplier: Partial<ISupplier>): void {
    this.supplierRepository.updateSupplier(supplier)
  }

  deleteSupplier(supplierCode: string): void {
    this.supplierRepository.deleteSupplier(supplierCode)
  }

  getSupplierByCode(supplierCode: string): ISupplier | null {
    return this.supplierRepository.getSupplierByCode(supplierCode)
  }

  getSupplierCodeCount(supplierCode: string): number {
    return this.supplierRepository.getSupplierCodeCount(supplierCode)
  }

  getCustomers(): ICustomer[] {
    return this.customerRepository.getCustomers()
  }

  addCustomer(customer: Partial<ICustomer>): void {
    this.customerRepository.addCustomer(customer)
  }

  updateCustomer(customer: Partial<ICustomer>): void {
    this.customerRepository.updateCustomer(customer)
  }

  deleteCustomer(customerCode: string): void {
    this.customerRepository.deleteCustomer(customerCode)
  }

  getCustomerByCode(customerCode: string, unpaidOnly: boolean): IDetailedCustomer | null {
    return this.customerRepository.getCustomerByCode(customerCode, unpaidOnly)
  }

  getCustomerPaymentStatus(customerCode: string): ICustomerPaymentStatus {
    return this.customerRepository.getCustomerPaymentStatus(customerCode)
  }

  getCustomerCompletePaymentStatus(customerCode: string): ICustomerCompletePaymentStatus | null {
    return this.customerRepository.getCustomerCompletePaymentStatus(customerCode)
  }

  getCustomerUnpaidOrdersStatus(customerCode: string): ICustomerBriefPaymentStatus {
    return this.customerRepository.getCustomerUnpaidOrdersStatus(customerCode)
  }

  getCustomerCodeCount(customerCode: string): number {
    return this.customerRepository.getCustomerCodeCount(customerCode)
  }

  getCustomersForAutocomplete(): ICustomer[] {
    return this.customerRepository.getCustomersForAutocomplete()
  }

  getProducts(): IProduct[] {
    return this.productRepository.getProducts()
  }

  getStorageQuantity(productId: number): number {
    return this.productRepository.getStorageQuantity(productId)
  }

  updateStorageQuantity(productId: number, quantity: number): void {
    this.productRepository.updateStorageQuantity(productId, quantity)
  }

  getProductByCode(productCode: string): IProduct | null {
    return this.productRepository.getProductByCode(productCode)
  }

  addProduct(product: Partial<IProduct>): void {
    this.productRepository.addProduct(product)
  }

  updateProductByCode(product: Partial<IProduct>): void {
    this.productRepository.updateProductByCode(product)
  }

  deleteProductByCode(productCode: string): void {
    this.productRepository.deleteProductByCode(productCode)
  }

  getProductCodeCount(productCode: string): number {
    return this.productRepository.getProductCodeCount(productCode)
  }

  getProductsForAutocomplete(): IProduct[] {
    return this.productRepository.getProductsForAutocomplete()
  }

  getOrders(startDate?: Date, endDate?: Date, unpaidOnly?: boolean): IOrderBrief[] {
    return this.orderRepository.getOrders(startDate, endDate, unpaidOnly)
  }

  getOrderByOrderNumber(orderNumber: number): IOrderWithDetails | null {
    return this.orderRepository.getOrderWithRowsByOrderNumber(orderNumber)
  }

  updateOrderDeliveryStatus(orderNumber: number, deliveryStatus: boolean): void {
    return this.orderRepository.updateOrderDeliveryStatus(orderNumber, deliveryStatus)
  }

  updateOrderPaymentStatus(orderNumber: number, paymentStatus: boolean): void {
    return this.orderRepository.updateOrderPaymentStatus(orderNumber, paymentStatus)
  }

  deleteOrder(orderNumber: number): void {
    return this.orderRepository.deleteOrder(orderNumber)
  }

  addOrder(order: Partial<IOrder>, rows: Partial<IOrderRow>[]): void {
    this.orderRepository.addOrder(order, rows)
  }

  getLastOrderNumber(): number {
    return this.orderRepository.selectLastOrderNumber()
  }

  getDrivers(): IDriver[] {
    return this.driverRepository.getDrivers()
  }

  addDriver(driver: Partial<IDriver>): void {
    this.driverRepository.addDriver(driver)
  }
  
  updateDriver(driver: Partial<IDriver>): void {
    this.driverRepository.updateDriver(driver)
  }
  deleteDriver(driverCode: string): void {
    this.driverRepository.deleteDriver(driverCode)
  }
  
  getDriverByCode(driverCode: string): IDriver | null {
    return this.driverRepository.getDriverByCode(driverCode)
  }
  getDriverCodeCount(driverCode: string): number {
    return this.driverRepository.getDriverCodeCount(driverCode)
  }
  
}
