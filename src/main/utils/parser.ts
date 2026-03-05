import { isPast, isToday } from "date-fns";
import { DEFAULT_CURRENCY_CODE, EDeliveryStatus } from "../constants";
import { IOrderBrief as IOrderDb, IOrderRowDetail as IOrderRowDb } from "../database/types";
import { IOrder, IOrderRow, TCurrency } from "../service/types";

export const getDeliveryStatus = (deliveryDate: string, status: 1 | 0): EDeliveryStatus => {
    if (!deliveryDate) return EDeliveryStatus.PENDING;
    const delivery = new Date(deliveryDate);
    if (status) return EDeliveryStatus.DELIVERED;
    if (!status && isToday(delivery)) return EDeliveryStatus.ON_ROUTE;
    if (!status && isPast(delivery)) return EDeliveryStatus.DELAYED;
    return EDeliveryStatus.ON_ROUTE;
  }

export const parseAmount = (value: number): TCurrency => {
  if (isNaN(value) || value === null) {
    return { amount: 0, currencyCode: DEFAULT_CURRENCY_CODE };
  }
  return { amount: value, currencyCode: DEFAULT_CURRENCY_CODE };
}

export const parseDelivery = (order: IOrderDb): IOrder['delivery'] => {
  return {
    date: order.deliveryDate,
    timeSlot: order.timeSlot,
    status: getDeliveryStatus(order.deliveryDate || '', order.deliveryStatus),
    deliveryAddress: order.deliveryAddress
  }
}

export const parseCustomer = (order: IOrderDb): IOrder['customer'] => {
  return {
    customerCode: order.customerCode,
    customerName: order.customerName,
    address: {
      street: order.addressStreet,
      city: order.addressCity,
      provinceCode: order.addressProvinceCode,
      zip: order.addressZip,
      country: order.addressCountry,
      neighborhood: order.addressNeighborhood
    },
    contact: {
      phone: order.phone,
      phoneAlt: order.phoneAlt,
      mail: order.mail
    }
  }
}

export const parseCustomerPaymentStatus = (order: IOrderDb): IOrder['customerPaymentStatus'] => {
  return {
    unpaidOrdersCount: order.unpaidOrdersCount,
    totalUnpaidAmount: order.unpaidTotalAmount
  }
}

export const parseDriver = (order: IOrderDb): IOrder['driver'] => {
  return {
    driverName: order.driverName,
    driverCode: order.driverCode
  }
}

export const parseProduct = (orderRow: IOrderRowDb): IOrderRow['product'] => {
  return {
    productCode: orderRow.productCode,
    productName: orderRow.productName,
    taxRate: orderRow.taxRate,
    netPrice: parseAmount(orderRow.unitPrice)
  }
}

export const parseOrderRows = (orderRows: IOrderRowDb[]): IOrderRow[] => {
  return orderRows.map((row) => ({
    rowId: row.rowId,
    orderId: row.orderId,
    product: parseProduct(row),
    quantity: row.quantity,
    unitPrice: parseAmount(row.unitPrice),
    totalPrice: parseAmount(row.totalPrice),
    taxAmount: parseAmount(row.taxAmount),
    totalGrossPrice: parseAmount(row.totalGrossPrice),
    taxRate: row.taxRate
  }))
}

export const to01 = (value: boolean | undefined): 1 | 0 => {
  return +Boolean(value) as 1 | 0;
}