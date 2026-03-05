export type TTimeSlot = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' | 'BANK_HOLIDAY' | 'ALL_DAY'

export enum EDeliveryStatus {
  PENDING = 'PENDING',
  ON_ROUTE = 'ON_ROUTE',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}

export type TCurrency = {
  amount: number
  currencyCode: 'EUR'
}

export interface IProduct {
  id?: number
  productCode: string
  productName: string
  category?: string
  netPrice: TCurrency
  taxRate: number
  supplier: {
    supplierName?: string
    supplierId?: number
    supplierPrice?: TCurrency
  }
}

export interface IProductDb {
  id?: number
  productCode: string
  productName: string
  category?: string
  netPrice: number
  taxRate: number
  supplierId?: number
  supplierPrice?: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}

export interface ISupplier {
  id?: number
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


export interface ICustomerCompletePaymentStatus extends ICustomerPaymentStatus {
  customerId: number
  customerCode: string
  totalOrdersCount: number
}

export interface ICustomerPaymentStatus {
  unpaidOrdersCount: number
  totalUnpaidAmount: number
}

export interface ICustomerBriefPaymentStatus {
  hasPaymentLeft: boolean
}

export interface IDriver {
  id?: number
  driverCode: string
  driverName: string
  phone?: string
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
  items: IOrderRow[]
}

export interface IOrderRow {
  id?: number
  orderId: number
  product: Partial<IProduct>
  quantity: number
  unitPrice: TCurrency
  totalPrice: TCurrency
  totalGrossPrice: TCurrency
  taxAmount: TCurrency
}

export interface INewOrder extends Omit<IOrderBase, 'id' | 'orderNumber' | 'delivery'> {
  customerId: number
  driverId?: number
  rows: INewOrderRow[]
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
  storageQuantity?: number | null
}