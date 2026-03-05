import { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react'
import { useOrders as useOrdersQuery } from '@renderer/hooks/useOrdersQuery'
import { useQueryInvalidationListener } from '@renderer/hooks/useQueryInvalidationListener'
import { endOfDay, startOfDay } from 'date-fns'
import { EDeliveryStatus, IOrder } from '@renderer/utils/types'
import { IDeliveryStats, IDriverGroup } from '@renderer/components/DeliveriesView/types'

interface IDeliveriesProviderContext {
  orders: IOrder[]
  isLoading: boolean
  error: Error | null
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  driverGroups: IDriverGroup[]
  stats: IDeliveryStats
}

const DeliveriesContext = createContext<IDeliveriesProviderContext | null>(null)

interface DeliveriesProviderProps {
  children: ReactNode
}

const DeliveriesProvider: FC<DeliveriesProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const start = startOfDay(selectedDate)
  const end = endOfDay(selectedDate)

  const { data = [], isLoading, error } = useOrdersQuery(start, end)
  useQueryInvalidationListener()

  const driverGroups = useMemo<IDriverGroup[]>(() => {
    const groupMap = new Map<string, IDriverGroup>()

    data.forEach((order) => {
      const driverCode = order.driver?.driverCode || 'NON_ASSEGNATO'
      const driverName = order.driver?.driverName || 'Non assegnato'

      if (!groupMap.has(driverCode)) {
        groupMap.set(driverCode, {
          driverCode,
          driverName,
          phone: order.driver?.phone,
          orders: [],
          totalOrders: 0,
          deliveredCount: 0,
          pendingCount: 0
        })
      }

      const group = groupMap.get(driverCode)!
      group.orders.push(order)
      group.totalOrders++

      if (order.delivery.status === EDeliveryStatus.DELIVERED) {
        group.deliveredCount++
      } else {
        group.pendingCount++
      }
    })

    return Array.from(groupMap.values()).sort((a, b) => b.totalOrders - a.totalOrders)
  }, [data])

  const stats = useMemo<IDeliveryStats>(() => {
    const totalOrders = data.length
    const deliveredCount = data.filter(
      (o) => o.delivery.status === EDeliveryStatus.DELIVERED
    ).length
    const pendingCount = data.filter(
      (o) =>
        o.delivery.status === EDeliveryStatus.PENDING ||
        o.delivery.status === EDeliveryStatus.ON_ROUTE
    ).length
    const delayedCount = data.filter(
      (o) => o.delivery.status === EDeliveryStatus.DELAYED
    ).length

    return {
      totalOrders,
      deliveredCount,
      pendingCount,
      delayedCount,
      totalDrivers: driverGroups.length,
      deliveryRate: totalOrders > 0 ? Math.round((deliveredCount / totalOrders) * 100) : 0
    }
  }, [data, driverGroups])

  return (
    <DeliveriesContext.Provider
      value={{
        orders: data,
        isLoading,
        error,
        selectedDate,
        setSelectedDate,
        driverGroups,
        stats
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  )
}

export const useDeliveries = () => {
  const context = useContext(DeliveriesContext)
  if (context === null) {
    throw new Error('useDeliveries must be used within a DeliveriesProvider')
  }
  return context
}

export default DeliveriesProvider
