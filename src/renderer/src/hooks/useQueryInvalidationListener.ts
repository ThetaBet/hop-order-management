import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@renderer/lib/queryKeys'

export const useQueryInvalidationListener = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!window.api?.window?.onQueriesInvalidated) {
      return
    }

    const removeListener = window.api.window.onQueriesInvalidated((queryType: string) => {
      switch (queryType) {
        case 'products':
          queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
          queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
          break
        case 'suppliers':
          queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })
          break
        case 'customers':
          queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })
          queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
          break
        case 'drivers':
          queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all })
          queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
          break
        case 'orders':
          queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
          break
        default:
          break
      }
    })

    return () => {
      removeListener()
    }
  }, [queryClient])
}
