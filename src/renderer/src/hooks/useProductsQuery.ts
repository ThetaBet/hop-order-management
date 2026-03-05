import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@renderer/lib/queryKeys'
import {
  getProducts,
  addProduct,
  updateProductByCode,
  deleteProductByCode,
  getProductCodeCount,
  getProductByCode,
  getProductsForAutocomplete
} from '@renderer/dbOperations/products'
import { getStorageQuantity, updateStorageQuantity } from '@renderer/dbOperations/products'
import { useDebounce } from './useDebounce'

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5 // 5 minuti
  })
}

export const useProductByCode = (productCode: string) => {
  return useQuery({
    queryKey: queryKeys.products.byCode(productCode),
    queryFn: async () => {
      const product = await getProductByCode(productCode)
      return product || null
    },
    enabled: !!productCode,
    staleTime: 1000 * 60 * 5
  })
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.products })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('products').catch(console.error)
        window.api.window.invalidateQueries('autocomplete_products').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiunta del prodotto:", error)
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProductByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.products })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('products').catch(console.error)
        window.api.window.invalidateQueries('autocomplete_products').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento del prodotto:", error)
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProductByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.products })
      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('products').catch(console.error)
        window.api.window.invalidateQueries('autocomplete_products').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'eliminazione del prodotto:", error)
    }
  })
}

export const useProductCodeCount = (productCode: string) => {
  const debouncedProductCode = useDebounce(productCode, 300)
  return useQuery({
    queryKey: queryKeys.products.countByCode(debouncedProductCode),
    queryFn: () => getProductCodeCount(debouncedProductCode),
    enabled: !!debouncedProductCode && debouncedProductCode.trim().length > 2
  })
}

export const useProductsForAutocomplete = () => {
  return useQuery({
    queryKey: queryKeys.autoComplete.products,
    queryFn: getProductsForAutocomplete,
    staleTime: 1000 * 60 * 10 // 10 minuti
  })
}

export const useStorageQuantity = (productId?: number) => {
  return useQuery({
    queryKey: ['storage', productId],
    queryFn: () => getStorageQuantity(productId as number),
    enabled: !!productId,
    staleTime: 1000 * 60 // 1 minuto
  })
}

export const useUpdateStorageQuantity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      updateStorageQuantity(productId, quantity),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['storage', vars.productId] })
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    }
  })
}

export const useAddOrUpdateProduct = (productCode: string) => {
  if (productCode) {
    return useUpdateProduct()
  }
  return useAddProduct()
}


