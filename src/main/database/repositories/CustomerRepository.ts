import Database from 'better-sqlite3'
import { DatabaseConnection } from '../DatabaseConnection'
import {
  ICustomer,
  ICustomerBriefPaymentStatus,
  ICustomerCompletePaymentStatus,
  ICustomerPaymentStatus,
  IDetailedCustomer,
  IOrder
} from '../types'
import {
  DELETE_CUSTOMER,
  INSERT_CUSTOMER,
  SELECT_ALL_CUSTOMERS,
  SELECT_CUSTOMER_BY_CODE,
  SELECT_CUSTOMER_CODE_COUNT,
  SELECT_CUSTOMER_PAYMENT_STATUS,
  SELECT_CUSTOMER_UNPAID_ORDERS,
  SELECT_CUSTOMERS_FOR_AUTOCOMPLETE,
  UPDATE_CUSTOMER_BY_CODE
} from '../queries/customers'
import log from '../../logger'
import { SELECT_ALL_ORDERS_BY_CUSTOMER_ID } from '../queries/orders'

interface ICustomerCodeParam {
  customerCode: string
}

interface IOrderByCustomerParams {
  customerId: number,
  filterUnpaid: 1 | 0
}

export class CustomerRepository {
  private db: Database.Database

  constructor() {
    this.db = DatabaseConnection.getInstance().getDatabase()
  }

  getCustomers(): ICustomer[] {
    const stmt = this.db.prepare<[], ICustomer>(SELECT_ALL_CUSTOMERS)
    log.database('Fetched all customers')
    return stmt.all()
  }

  addCustomer(customer: Partial<ICustomer>): void {
    const stmt = this.db.prepare<{}, ICustomer>(INSERT_CUSTOMER)
    const result = stmt.run(customer)
    log.database(`Customer added with ID: ${result.lastInsertRowid}`)
  }

  updateCustomer(customer: Partial<ICustomer>): void {
    const stmt = this.db.prepare<{}, ICustomer>(UPDATE_CUSTOMER_BY_CODE)
    const result = stmt.run(customer)
    log.database(`Customer updated with code: ${customer.customerCode}, Changes: ${result.changes}`)
  }

  deleteCustomer(customerCode: string): void {
    const stmt = this.db.prepare<ICustomerCodeParam>(DELETE_CUSTOMER)
    stmt.run({ customerCode })
    log.database(`Customer deleted with code: ${customerCode}`)
  }

  getCustomerByCode(customerCode: string, unpaidOnly: boolean): IDetailedCustomer | null {
    const stmt = this.db.prepare<ICustomerCodeParam, IDetailedCustomer>(SELECT_CUSTOMER_BY_CODE)
    const customer = stmt.get({ customerCode })
    if (!customer) return null
    log.database(`Fetched customer with code: ${customerCode}`)
    const orders = this.db.prepare<IOrderByCustomerParams, IOrder>(SELECT_ALL_ORDERS_BY_CUSTOMER_ID).all({ customerId: customer.id, filterUnpaid: unpaidOnly ? 1 : 0 })
    log.database(`Fetched orders for customer with code: ${customerCode}, Unpaid Only: ${unpaidOnly}`)
    return { ...customer, orders: orders || [] }
  }

  getCustomerPaymentStatus(customerCode: string): ICustomerPaymentStatus {
    const stmt = this.db.prepare<ICustomerCodeParam, ICustomerPaymentStatus>(
      SELECT_CUSTOMER_UNPAID_ORDERS
    )
    const result = stmt.get({ customerCode })
    log.database(`Fetched customer payment status with code: ${customerCode}`)
    return (
      result || {
        unpaidOrdersCount: 0,
        unpaidTotalAmount: 0
      }
    )
  }

  getCustomerCompletePaymentStatus(customerCode: string): ICustomerCompletePaymentStatus | null {
    const stmt = this.db.prepare<ICustomerCodeParam, ICustomerCompletePaymentStatus>(
      SELECT_CUSTOMER_PAYMENT_STATUS
    )
    const result = stmt.get({ customerCode })
    log.database(`Fetched customer complete payment status with code: ${customerCode}`)
    return result || null
  }

  getCustomerUnpaidOrdersStatus(customerCode: string): ICustomerBriefPaymentStatus {
    const stmt = this.db.prepare<ICustomerCodeParam, ICustomerBriefPaymentStatus>(
      SELECT_CUSTOMER_UNPAID_ORDERS
    )
    const result = stmt.get({ customerCode })
    log.database(`Fetched customer brief unpaid orders status with code: ${customerCode}`)
    return (
      result || {
        hasPaymentLeft: false
      }
    )
  }

  getCustomerCodeCount(customerCode: string): number {
    const stmt = this.db.prepare<ICustomerCodeParam, { count: number }>(SELECT_CUSTOMER_CODE_COUNT)
    const result = stmt.get({ customerCode })
    log.database(`Counted customers with code: ${customerCode}, Count: ${result?.count || 0}`)
    return result?.count || 0
  }

  getCustomersForAutocomplete(): ICustomer[] {
    const stmt = this.db.prepare<[], ICustomer>(SELECT_CUSTOMERS_FOR_AUTOCOMPLETE)
    log.database('Fetched customers for autocomplete')
    return stmt.all()
  }
}
