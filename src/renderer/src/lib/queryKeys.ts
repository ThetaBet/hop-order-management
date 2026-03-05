import { formatISO } from "date-fns";

export const queryKeys = {
  products: {
    all: ['products'] as const,
    count: ['productsCount'] as const,
    list: () => [...queryKeys.products.all, 'list'] as const,
    byCode: (code: string) => [...queryKeys.products.all, 'byCode', code] as const,
    countByCode: (code: string) => [...queryKeys.products.all, 'count', code] as const
  },
  orders: {
    all: ['orders'] as const,
    list: (startDate?: Date, endDate?: Date, unpaidOnly?: boolean) => [...queryKeys.orders.all, 'list', formatISO(startDate || new Date()), formatISO(endDate || new Date()), unpaidOnly ?? false] as const,
    byNumber: (orderNumber: number) => [...queryKeys.orders.all, 'byNumber', orderNumber] as const
  },
  suppliers: {
    all: ['suppliers'] as const,
    list: () => [...queryKeys.suppliers.all, 'list'] as const,
    byId: (id: number) => [...queryKeys.suppliers.all, 'byId', id] as const,
    countByCode: () => [...queryKeys.suppliers.all, 'countByCode'] as const
  },
  customers: {
    all: ['customers'] as const,
    list: () => [...queryKeys.customers.all, 'list'] as const,
    byCode: (code: string) => [...queryKeys.customers.all, 'byCode', code] as const,
    paymentStatus: (code: string) => [...queryKeys.customers.all, 'paymentStatus', code] as const,
    completePaymentStatus: (code: string) => [...queryKeys.customers.all, 'completePaymentStatus', code] as const,
    unpaidOrdersStatus: (code: string) => [...queryKeys.customers.all, 'unpaidOrdersStatus', code] as const,
    countByCode: () => [...queryKeys.customers.all, 'countByCode'] as const
  },
  drivers: {
    all: ['drivers'] as const,
    list: () => [...queryKeys.drivers.all, 'list'] as const,
    byCode: (code: string) => [...queryKeys.drivers.all, 'byCode', code] as const,
    countByCode: (code: string) => [...queryKeys.drivers.all, 'countByCode', code] as const
  },
  autoComplete: {

    products: ['autocomplete_products'] as const,
    customers: ['autocomplete_customers'] as const
  }
} as const
