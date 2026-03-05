export const DEFAULT_CURRENCY_CODE = 'EUR' as const
export enum EDeliveryStatus {
  PENDING = 'PENDING',
  ON_ROUTE = 'ON_ROUTE',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}
