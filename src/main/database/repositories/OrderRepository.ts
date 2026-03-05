import Database from 'better-sqlite3'
import { DatabaseConnection } from '../DatabaseConnection'
import { IOrder, IOrderBrief, IOrderRow, IOrderRowDetail } from '../types'
import {
  SELECT_ALL_ORDERS_BRIEF,
  SELECT_ORDER_BY_ID,
  SELECT_ORDER_ROWS_BY_ORDER_ID,
  UPDATE_DELIVERY_STATUS_BY_ORDER_NUMBER,
  UPDATE_PAYMENT_STATUS_BY_ORDER_NUMBER,
  DELETE_ORDER,
  DELETE_ORDER_ROWS_BY_ORDER_ID,
  SELECT_ORDER_ID_BY_NUMBER,
  INSERT_ORDER,
  INSERT_ORDER_ROW,
  SELECT_LAST_ESTIMATED_ORDER_NUMBER
} from '../queries/orders'
import log from '../../logger'
import { add, formatISO, sub } from 'date-fns'

interface IOrderIdParam {
  orderId: number
}

interface IOrderBriefParams {
  startDate: string
  endDate: string
  filterUnpaid: 1 | 0
}

export class OrderRepository {
  private db: Database.Database

  constructor() {
    this.db = DatabaseConnection.getInstance().getDatabase()
  }

  getOrders(startDate: Date = sub(new Date(), { years: 1 }), endDate: Date = add(new Date(), { years: 1 }), unpaidOnly: boolean = false): IOrderBrief[] {
    const stmt = this.db.prepare<IOrderBriefParams, IOrderBrief>(SELECT_ALL_ORDERS_BRIEF)
    log.database('Fetched all orders')
    return stmt.all({ startDate: formatISO(startDate), endDate: formatISO(endDate), filterUnpaid: unpaidOnly ? 1 : 0 })
  }

  getOrderWithRowsByOrderNumber(orderNumber: number) {
    const order = this.db.prepare<{ orderNumber: number }, IOrderBrief>(SELECT_ORDER_BY_ID).get({ orderNumber });
    if (!order) return null
    log.database(`Fetched order with number: ${orderNumber}`);
    const orderRows = this.db.prepare<IOrderIdParam, IOrderRowDetail>(SELECT_ORDER_ROWS_BY_ORDER_ID).all({ orderId: order.id });
    log.database(`Fetched order rows for order ID: ${order.id}`);
    return { ...order, items: orderRows || [] };
  }

  updateOrderPaymentStatus(orderNumber: number, paymentStatus: boolean): void {
    const stmt = this.db.prepare(UPDATE_PAYMENT_STATUS_BY_ORDER_NUMBER)
    const result = stmt.run({ orderNumber, paymentStatus: paymentStatus ? 1 : 0 })
    log.database(
      `Order payment status updated for order number: ${orderNumber}, Changes: ${result.changes}`
    )
  }

  updateOrderDeliveryStatus(orderNumber: number, deliveryStatus: boolean): void {
    const stmt = this.db.prepare(UPDATE_DELIVERY_STATUS_BY_ORDER_NUMBER)
    const result = stmt.run({ orderNumber, deliveryStatus: deliveryStatus ? 1 : 0 })
    log.database(
      `Order delivery status updated for order number: ${orderNumber}, Changes: ${result.changes}`
    )
  }

  deleteOrder(orderNumber: number): void {
    const transaction = this.db.transaction((payload: { orderNumber: number }) => {
      const orderIdStmt = this.db.prepare<{ orderNumber: number }, { id: number }>(SELECT_ORDER_ID_BY_NUMBER)
      const order = orderIdStmt.get({ orderNumber: payload.orderNumber })
      if (!order) {
        throw new Error(`Order with number ${payload.orderNumber} not found`)
      }
      const deleteRowsStmt = this.db.prepare(DELETE_ORDER_ROWS_BY_ORDER_ID)
      deleteRowsStmt.run({ orderId: order.id })
      log.database(`Order rows deleted for order ID: ${order.id}`)
      const deleteOrderStmt = this.db.prepare(DELETE_ORDER)
      const result = deleteOrderStmt.run({ orderNumber: payload.orderNumber })
      log.database(`Order deleted with number: ${payload.orderNumber}, Changes: ${result.changes}`)
    })    
    try {
      transaction({ orderNumber })
    } catch (error) {
      log.database(`Error deleting order with number: ${orderNumber} - ${error}`)
      throw new Error(`Error deleting order with number: ${orderNumber} - ${error}`)
    }
  }

  addOrder(order: Partial<IOrder>, rows: Partial<IOrderRow>[]): void {
    console.log('Adding order with data:', { order, rows })
    const transaction = this.db.transaction((payload: { basicOrderInfo: Partial<IOrder>, orderRows: Partial<IOrderRow>[] }) => {
      const newOrder = this.db.prepare<{}, IOrder>(INSERT_ORDER);
      const result = newOrder.run(payload.basicOrderInfo);
      const orderId = result.lastInsertRowid as number;
      log.database(`Order added with ID: ${orderId}`);
      const insertRow = this.db.prepare<{}, IOrderRow>(INSERT_ORDER_ROW);
      for (const row of payload.orderRows) {
        const rowResult = insertRow.run({ ...row, orderId });
        if (rowResult.changes === 0) {
          throw new Error(`Failed to add order row #${payload.orderRows.indexOf(row) + 1} for order ID: ${orderId}`);
        }
        log.database(`Order row added for order ID: ${orderId}`);
      }
      return orderId;
    });
    try {
      const id = transaction({ basicOrderInfo: order, orderRows: rows });
      log.database(`Transaction committed with order ID: ${id}`)
    } catch (error) {
      log.database(`Error adding order - ${error}`)
      throw new Error(`Error adding order - ${error}`)
    }
  }

  selectLastOrderNumber(): number {
    const stms = this.db.prepare<{}, { lastOrderNumber: number }>(SELECT_LAST_ESTIMATED_ORDER_NUMBER)
    const result = stms.get({})
    log.database(`Fetched last estimated order number: ${result?.lastOrderNumber ?? 1}`)
    return result?.lastOrderNumber ?? 1
  }
}
