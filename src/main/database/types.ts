export type TTimeSlot = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' | 'BANK_HOLIDAY' | 'ALL_DAY'

export interface IProduct {
  id: number
  productCode: string
  productName: string
  category?: string
  netPrice: number
  taxRate: number
  supplierId?: number
  supplierPrice?: number
  supplierName?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: 1 | 0
  storageQuantity?: number
}

export interface ISupplier {
  id: number
  supplierCode: string
  supplierName: string
  paymentForm?: string
  paymentTerms?: string
  notes?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: 1 | 0
}

export interface ICustomer {
  id: number
  customerCode: string
  customerName: string
  notes?: string
  addressStreet?: string
  addressCity?: string
  addressProvinceCode?: string
  addressZip?: string
  addressCountry?: string
  addressNeighborhood?: string
  phone?: string
  phoneAlt?: string
  mail?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: 1 | 0
}

export interface IDetailedCustomer extends ICustomer {
  unpaidOrdersCount: number
  unpaidTotalAmount: number
  hasPaymentLeft: 1 | 0
  orders: IOrder[]
}

export interface ICustomerCompletePaymentStatus extends ICustomerPaymentStatus {
  customerId: number
  customerCode: string
  totalOrdersCount: number
}

export interface ICustomerPaymentStatus {
  unpaidOrdersCount: number
  unpaidTotalAmount: number
}

export interface ICustomerBriefPaymentStatus {
  hasPaymentLeft: 1 | 0
}

export interface IOrder {
  id: number
  orderNumber: number
  customerId: number
  orderDate: string
  deliveryDate?: string
  timeSlot?: TTimeSlot
  driverId?: number
  totalAmount: number
  subtotalAmount: number
  taxAmount: number
  deliveryStatus: 1 | 0
  paymentStatus: 1 | 0
  notes?: string
  deliveryAddress?: string
  createdAt: string
  updatedAt: string
  isActive: 1 | 0
}

export interface IOrderBrief extends IOrder {
  customerCode: string
  customerName: string
  addressStreet?: string
  addressCity?: string
  addressProvinceCode?: string
  addressZip?: string
  addressCountry?: string
  addressNeighborhood?: string
  phone?: string
  phoneAlt?: string
  mail?: string
  driverName?: string
  driverCode?: string
  hasPaymentLeft: 1 | 0
  unpaidOrdersCount: number
  unpaidTotalAmount: number
}

export interface IOrderRow {
  rowId: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  totalGrossPrice: number
  taxAmount: number
  taxRate: number
  createdAt: string
  updatedAt: string
  isActive: 1 | 0
}

export interface IOrderRowDetail extends IOrderRow {
  productCode: string
  productName: string
  category?: string
  taxRate: number
  taxAmount: number
  totalGrossPrice: number
}

export interface IOrderWithDetails extends IOrderBrief {
  items: IOrderRowDetail[]
}


export interface IOrderCount {
  orderCount: number
}

export interface IDriver {
  id: number
  driverCode: string
  driverName: string
  phone?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: 1 | 0
}