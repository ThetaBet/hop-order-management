import { addDriver, getDriverByCode, getDrivers, updateDriverByCode } from "@renderer/dbOperations/drivers"
import { queryKeys } from "@renderer/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "./useDebounce"

export const useDrivers = () => {
  return useQuery({
    queryKey: queryKeys.drivers.list(),
    queryFn: getDrivers,
    staleTime: 1000 * 60 * 5 // 5 minuti
  })
}

export const useDriverByCode = (driverCode: string) => {
  return useQuery({
    queryKey: queryKeys.drivers.byCode(driverCode),
    queryFn: async () => {
      const driver = await getDriverByCode(driverCode)
      return driver || null
    },
    enabled: !!driverCode,
    staleTime: 1000 * 60 * 5
  })
}

export const useAddDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.drivers.all, queryKeys.orders.all] })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('drivers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiunta del driver:", error)
    }
  })
}

export const useUpdateDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDriverByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.drivers.all, queryKeys.orders.all] })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('drivers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento del driver:", error)
    }
  })
}

export const useDeleteDriver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (driverCode: string) => {
      return await window.api.database.deleteDriver(driverCode)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('drivers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'eliminazione del driver:", error)
    }
  })
}

export const useDriverCodeCount = (driverCode: string) => {
  const debouncedDriverCode = useDebounce(driverCode, 300)
  return useQuery({
    queryKey: queryKeys.drivers.countByCode(debouncedDriverCode),
    queryFn: async () => {
      return await window.api.database.getDriverCodeCount(debouncedDriverCode)
    },
    enabled: !!debouncedDriverCode && debouncedDriverCode.trim().length > 2
  })
}