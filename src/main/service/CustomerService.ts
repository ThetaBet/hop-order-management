import DB from '../database/DB'
import { ICustomer, IDetailedCustomer } from './types'
import { ICustomer as ICustomerDb, IDetailedCustomer as IDetailedCustomerDb } from '../database/types'
import log from '../logger'
import { formatISO } from 'date-fns'
import { getDeliveryStatus, parseAmount } from '../utils/parser'

export class CustomerService {
  private db: DB
  constructor(db: DB) {
    this.db = db
  }

  parseCustomer(customer: ICustomerDb): ICustomer {
    return {
      id: customer.id,
      customerCode: customer.customerCode,
      customerName: customer.customerName,
      notes: customer.notes,
      address: {
        street: customer.addressStreet,
        city: customer.addressCity,
        provinceCode: customer.addressProvinceCode,
        zip: customer.addressZip,
        country: customer.addressCountry,
        neighborhood: customer.addressNeighborhood
      },
      contact: {
        phone: customer.phone,
        phoneAlt: customer.phoneAlt,
        mail: customer.mail
      }
    }
  }

  parseDetailedCustomer(customer: IDetailedCustomerDb): IDetailedCustomer {
    return {
      ...this.parseCustomer(customer),
      hasPaymentLeft: Boolean(customer.hasPaymentLeft),
      paymentStatus: {
        unpaidOrdersCount: customer.unpaidOrdersCount || 0,
        totalUnpaidAmount: customer.unpaidTotalAmount || 0,
      },
      orders: customer.orders.map((order) => ({
        orderNumber: order.orderNumber,
        orderDate: formatISO(new Date(order.orderDate)),
        totalAmount: parseAmount(order.totalAmount),
        subtotalAmount: parseAmount(order.subtotalAmount),
        taxAmount: parseAmount(order.taxAmount),
        paymentStatus: Boolean(order.paymentStatus),
        delivery: {
          date: order.deliveryDate,
          timeSlot: order.timeSlot,
          status: getDeliveryStatus(order.deliveryDate || '', order.deliveryStatus),
          address: order.deliveryAddress
        }
      }))
  }
  }

  parseCustomerDb(
    customer: ICustomer
  ): Omit<ICustomerDb, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isActive'> {
    return {
      id: customer.id!,
      customerCode: customer.customerCode,
      customerName: customer.customerName,
      notes: customer.notes,
      addressStreet: customer.address.street,
      addressCity: customer.address.city,
      addressProvinceCode: customer.address.provinceCode,
      addressZip: customer.address.zip,
      addressCountry: customer.address.country,
      addressNeighborhood: customer.address.neighborhood,
      phone: customer.contact.phone,
      phoneAlt: customer.contact.phoneAlt,
      mail: customer.contact.mail
    }
  }

  getCustomers(): ICustomer[] {
    try {
      const rawCustomers = this.db.getCustomers()
      return rawCustomers.map((customer) => this.parseCustomer(customer))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  addCustomer(customer: ICustomer) {
    try {
      this.db.addCustomer(this.parseCustomerDb(customer))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  updateCustomerByCode(customer: ICustomer) {
    try {
      this.db.updateCustomer(this.parseCustomerDb(customer))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  deleteCustomerByCode(customerCode: string) {
    try {
      this.db.deleteCustomer(customerCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getCustomerByCode(customerCode: string, unpaidOnly: boolean): IDetailedCustomer | null {
    try {
      const customer = this.db.getCustomerByCode(customerCode, unpaidOnly)
      if (!customer) {
        return null
      }
      return this.parseDetailedCustomer(customer)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getCustomerPaymentStatus(customerCode: string) {
    try {
      return this.db.getCustomerPaymentStatus(customerCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getCustomerCompletePaymentStatus(customerCode: string) {
    try {
      return this.db.getCustomerCompletePaymentStatus(customerCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getCustomerUnpaidOrdersStatus(customerCode: string) {
    try {
      return this.db.getCustomerUnpaidOrdersStatus(customerCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }
  getCustomerCodeCount(customerCode: string): number {
    try {
      return this.db.getCustomerCodeCount(customerCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getCustomersForAutocomplete(): ICustomer[] {
    try {
      const rawCustomers = this.db.getCustomersForAutocomplete()
      return rawCustomers.map((customer) => this.parseCustomer(customer))
    } catch (error) {
      log.error(error as string)
      throw error
    }
}
}
