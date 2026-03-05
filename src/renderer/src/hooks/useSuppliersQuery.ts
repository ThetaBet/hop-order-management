import {
  addSupplier,
  deleteSupplierByCode,
  getSupplierCodeCount,
  getSuppliers,
  updateSupplierByCode
} from '@renderer/dbOperations/suppliers'
import { queryKeys } from '@renderer/lib/queryKeys'
import { ISupplier } from '@renderer/utils/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from './useDebounce'

export const useGetSuppliers = () => {
  return useQuery<ISupplier[]>({
    queryKey: queryKeys.suppliers.list(),
    queryFn: getSuppliers,
    staleTime: 1000 * 60 * 5
  })
}

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSupplierByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('suppliers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error('Errore durante la cancellazione del fornitore:', error)
    }
  })
}

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSupplierByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('suppliers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento del fornitore:", error)
    }
  })
}

export const useAddSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addSupplier, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers.all })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('suppliers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiunta del fornitore:", error)
    }
  })
}

export const useSupplierCodeCount = (supplierCode: string) => {
  const debouncedSupplierCode = useDebounce(supplierCode, 300)
  return useQuery({
    queryKey: [queryKeys.suppliers.countByCode(), debouncedSupplierCode],
    queryFn: () => getSupplierCodeCount(debouncedSupplierCode),
    enabled: debouncedSupplierCode.length > 0
  })
}
