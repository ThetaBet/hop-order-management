import { IOrder } from '@renderer/utils/types'

export interface IDriverGroup {
  driverCode: string
  driverName: string
  phone?: string
  orders: IOrder[]
  totalOrders: number
  deliveredCount: number
  pendingCount: number
}

export interface IDeliveryStats {
  totalOrders: number
  deliveredCount: number
  pendingCount: number
  delayedCount: number
  totalDrivers: number
  deliveryRate: number
}
