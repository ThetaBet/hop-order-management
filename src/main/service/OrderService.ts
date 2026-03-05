import DB from '../database/DB'
import { IOrder as IOrderDb, IOrderRow as IOrderRowDb } from '../database/types'
import log from '../logger'
import { parseAmount, parseCustomer, parseCustomerPaymentStatus, parseDelivery, parseDriver, parseOrderRows, to01 } from '../utils/parser'
import { IDetailedOrder, INewOrder, INewOrderRow, IOrder } from './types'
import { formatISO } from 'date-fns'


export class OrderService {
  private db: DB
  constructor(db: DB) {
    this.db = db
  }

  parseNewOrder(order: INewOrder): Partial<IOrderDb> {
    return {
      customerId: order.customerId,
      driverId: order.driverId,
      orderDate: order.orderDate || formatISO(new Date()),
      deliveryDate: order.delivery.date,
      timeSlot: order.delivery.timeSlot,
      deliveryStatus: to01(order.delivery.status),
      totalAmount: order.totalAmount.amount,
      subtotalAmount: order.subtotalAmount.amount,
      taxAmount: order.taxAmount.amount,
      paymentStatus: to01(order.paymentStatus),
      notes: order.notes || '',
      deliveryAddress: order.delivery.deliveryAddress || ''
    }
  }

  parseNeworderRow(row: INewOrderRow): Partial<IOrderRowDb> {
    return {
      productId: row.productId,
      quantity: row.quantity,
      unitPrice: row.unitPrice?.amount,
      totalPrice: row.totalPrice?.amount,
      taxAmount: row.taxAmount?.amount,
      totalGrossPrice: row.totalGrossPrice?.amount,
      taxRate: row.taxRate
    }
  }

  getOrders(startDate?: Date, endDate?: Date, unpaidOnly?: boolean): IOrder[] {
    try {
      const rawOrders = this.db.getOrders(startDate, endDate, unpaidOnly)
      return rawOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        orderDate: formatISO(new Date(order.orderDate)),
        delivery: parseDelivery(order),
        totalAmount: parseAmount(order.totalAmount),
        subtotalAmount: parseAmount(order.subtotalAmount),
        taxAmount: parseAmount(order.taxAmount),
        paymentStatus: Boolean(order.paymentStatus),
        notes: order.notes,
        customer: parseCustomer(order),
        customerPaymentStatus: parseCustomerPaymentStatus(order),
        hasPaymentLeft: Boolean(order.hasPaymentLeft),
        driver: parseDriver(order)
      }))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getOrderByOrderNumber(orderNumber: number): IDetailedOrder | null {
    try {
      const orderData = this.db.getOrderByOrderNumber(orderNumber)
      if (!orderData) {
        log.database(`Order with order number ${orderNumber} not found`)
        return null
      }
      return {
        id: orderData.id,
        orderNumber: orderData.orderNumber,
        orderDate: formatISO(new Date(orderData.orderDate)),
        delivery: parseDelivery(orderData),
        totalAmount: parseAmount(orderData.totalAmount),
        subtotalAmount: parseAmount(orderData.subtotalAmount),
        taxAmount: parseAmount(orderData.taxAmount),
        paymentStatus: Boolean(orderData.paymentStatus),
        notes: orderData.notes,
        customer: parseCustomer(orderData),
        customerPaymentStatus: parseCustomerPaymentStatus(orderData),
        hasPaymentLeft: Boolean(orderData.hasPaymentLeft),
        driver: parseDriver(orderData),
        items: parseOrderRows(orderData.items || [])
      }
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  updateOrderPaymentStatus(orderNumber: number, paymentStatus: boolean): void {
    try {
      this.db.updateOrderPaymentStatus(orderNumber, paymentStatus)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }
  
  updateOrderDeliveryStatus(orderNumber: number, deliveryStatus: boolean): void {
    try {
      this.db.updateOrderDeliveryStatus(orderNumber, deliveryStatus)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  deleteOrder(orderNumber: number): void {
    try {
      this.db.deleteOrder(orderNumber)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  addOrder(newOrder: INewOrder): void {
    try {
      this.db.addOrder(this.parseNewOrder(newOrder), newOrder.rows.map((row) => this.parseNeworderRow(row)))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getLastOrderNumber(): number {
    try {
      const lastOrderNumber = this.db.getLastOrderNumber()
      return lastOrderNumber
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }
}
