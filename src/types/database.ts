export interface ICustomer {
  id: number
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
  phone?: string
  phoneAlt?: string
  mail?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: boolean
}

export interface IProduct {
  id: number
  productCode: string
  productName: string
  category?: string
  netPrice: number
  taxRate: number
  supplierId?: number
  supplierPrice?: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: boolean
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
  isActive: boolean
}

export interface IDebtsCredits {
  id: number
  customerId: number
  supplierId: number
  amount: number
  dueDate: string
  description?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: boolean
}

export interface IOrder {
  id: number
  orderCode: string
  customerId: number
  orderDate: string
  deliveryDate?: string
  status: EOrderStatus
  totalAmount: number
  notes?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isActive: boolean
}

export enum EOrderStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled'
}

export interface IDatabaseAPI {
  createCustomer: (customer: Partial<ICustomer>) => Promise<any>
  getCustomers: () => Promise<ICustomer[]>
  getCustomerById: (id: number) => Promise<ICustomer>
  updateCustomer: (id: number, customer: Partial<ICustomer>) => Promise<any>
  deleteCustomer: (id: number) => Promise<any>

  createProduct: (product: Partial<IProduct>) => Promise<any>
  getProducts: () => Promise<IProduct[]>
  getProductById: (id: number) => Promise<IProduct>
  updateProduct: (id: number, product: Partial<IProduct>) => Promise<any>
  deleteProduct: (id: number) => Promise<any>

  createSupplier: (supplier: Partial<ISupplier>) => Promise<any>
  getSuppliers: () => Promise<ISupplier[]>
  getSupplierById: (id: number) => Promise<ISupplier>
  updateSupplier: (id: number, supplier: Partial<ISupplier>) => Promise<any>
  deleteSupplier: (id: number) => Promise<any>
}
