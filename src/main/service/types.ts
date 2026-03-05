import { EDeliveryStatus } from '../constants'
import { TTimeSlot } from '../database/types'

export type TCurrency = {
  amount: number
  currencyCode: 'EUR'
}

export interface IProduct {
  id: number
  productCode: string
  productName: string
  category?: string
  netPrice: TCurrency
  taxRate: number
  storageQuantity?: number
  supplier: {
    supplierName?: string
    supplierId?: number
    supplierPrice?: TCurrency
  }
}

export interface ISupplier {
  id: number
  supplierCode: string
  supplierName: string
  payment: {
    paymentForm?: string
    paymentTerms?: string
  }
  notes?: string
}

export interface ICustomer {
  id?: number
  customerCode: string
  customerName: string
  notes?: string
  address: {
    street?: string
    city?: string
    provinceCode?: string
    zip?: string
    country?: string
    neighborhood?: string
  }
  contact: {
    phone?: string
    phoneAlt?: string
    mail?: string
  }
}

export interface IDetailedCustomer extends ICustomer {
  hasPaymentLeft: boolean
  paymentStatus: ICustomerPaymentStatus
  orders: IOrderBase[]
}


export interface IOrderBase {
  id?: number
  orderNumber?: number
  orderDate?: string
  delivery: {
    date?: string
    timeSlot?: TTimeSlot
    status: EDeliveryStatus
    deliveryAddress?: string
  }
  totalAmount: TCurrency
  subtotalAmount: TCurrency
  taxAmount: TCurrency
  paymentStatus: boolean
  notes?: string
}

export interface ICustomerPaymentStatus {
  unpaidOrdersCount: number
  totalUnpaidAmount: number
}

export interface IOrder extends IOrderBase {
  customer: Partial<ICustomer>
  customerPaymentStatus: ICustomerPaymentStatus
  driver: Partial<IDriver>
  hasPaymentLeft: boolean
}

export interface IDetailedOrder extends IOrder {
  customer: Partial<ICustomer>
  driver: Partial<IDriver>
  items: IOrderRow[]
}

export interface IOrderRow {
  rowId?: number
  orderId: number
  product: Partial<IProduct>
  quantity: number
  unitPrice: TCurrency
  totalPrice: TCurrency
  taxAmount: TCurrency
  totalGrossPrice: TCurrency
  taxRate: number
}

export interface IDriver {
  id?: number
  driverCode: string
  driverName: string
  phone?: string
}

export interface INewOrder extends Omit<IOrderBase, 'id' | 'orderNumber' | 'delivery'> {
  customerId: number,
  driverId?: number
  rows: INewOrderRow[],
  delivery: {
    date?: string
    timeSlot?: TTimeSlot
    deliveryAddress?: string
    status: boolean
  }
}

export interface INewOrderRow {
  productId: number
  quantity: number
  unitPrice?: TCurrency
  totalPrice?: TCurrency
  taxAmount?: TCurrency
  totalGrossPrice?: TCurrency
  taxRate?: number
  storageQuantity?: number
}