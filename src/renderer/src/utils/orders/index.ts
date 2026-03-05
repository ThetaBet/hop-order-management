import { EDeliveryStatus, IOrder } from '../types'

export const hasPaymentLeft = (order: IOrder) => {
  if (!order.paymentStatus) {
    return order.customerPaymentStatus?.totalUnpaidAmount > 1
  }
  if (order.hasPaymentLeft) return true
  return false
}

export const deliveryLabelMap = {
  [EDeliveryStatus.PENDING]: 'In attesa',
  [EDeliveryStatus.DELIVERED]: 'Consegnato',
  [EDeliveryStatus.DELAYED]: 'In ritardo',
  [EDeliveryStatus.CANCELLED]: 'Annullato',
  [EDeliveryStatus.ON_ROUTE]: 'In consegna'
}