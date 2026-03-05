import { addCustomer, deleteCustomerByCode, getCustomerByCode, getCustomerCodeCount, getCustomerCompletePaymentStatus, getCustomerPaymentStatus, getCustomers, getCustomersForAutocomplete, getCustomerUnpaidOrdersStatus, updateCustomerByCode } from "@renderer/dbOperations/customers"
import { queryKeys } from "@renderer/lib/queryKeys"
import { ICustomer, ICustomerBriefPaymentStatus, ICustomerCompletePaymentStatus, ICustomerPaymentStatus, IDetailedCustomer } from "@renderer/utils/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "./useDebounce"

export const useGetCustomers = () => {
  return useQuery<ICustomer[]>({
    queryKey: queryKeys.customers.list(),
    queryFn: getCustomers,
    staleTime: 1000 * 60 * 5
  })
}

export const useCustomerByCode = (customerCode: string, unpaidOnly: boolean) => {
  return useQuery<IDetailedCustomer | null>({
    queryKey: queryKeys.customers.byCode(customerCode),
    queryFn: async () => {
      const result = await getCustomerByCode(customerCode, unpaidOnly)
      return result || null
    },
    enabled: !!customerCode,
    staleTime: 1000 * 60 * 5,
  })
} 

export const useGetCustomerPaymentStatus = (customerCode: string) => {
  return useQuery<ICustomerPaymentStatus | null>({
    queryKey: queryKeys.customers.paymentStatus(customerCode),
    queryFn: () => getCustomerPaymentStatus(customerCode)
  })
}

export const useGetCustomerCompletePaymentStatus = (customerCode: string) => {
  return useQuery<ICustomerCompletePaymentStatus | null>({
    queryKey: queryKeys.customers.completePaymentStatus(customerCode),
    queryFn: () => getCustomerCompletePaymentStatus(customerCode)
  })
}

export const useGetCustomerUnpaidOrdersStatus = (customerCode: string) => {
  return useQuery<ICustomerBriefPaymentStatus | null>({
    queryKey: queryKeys.customers.unpaidOrdersStatus(customerCode),
    queryFn: () => getCustomerUnpaidOrdersStatus(customerCode)
  })
}

export const useAddCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.customers })

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('customers').catch(console.error)
        window.api.window.invalidateQueries('autocomplete_customers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiunta del cliente:", error)
    }
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomerByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.customers })
      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('customers').catch(console.error)
        window.api.window.invalidateQueries('autocomplete_customers').catch(console.error)
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento del cliente:", error)
    }
  })
}

export const useAddOrUpdateCustomer = (customerCode: string) => {
  if (customerCode) {
    return useUpdateCustomer()
  }
  return useAddCustomer()
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomerByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.autoComplete.customers });
      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('customers').catch(console.error);
        window.api.window.invalidateQueries('autocomplete_customers').catch(console.error);
      }
    },
    onError: (error) => {
      console.error("Errore durante l'eliminazione del cliente:", error);
    }
  });
}

export const useCustomerCodeCount = (customerCode: string) => {
  const debouncedCustomerCode = useDebounce(customerCode, 300)
  return useQuery<number>({
    queryKey: queryKeys.customers.countByCode(),
    queryFn: () => getCustomerCodeCount(debouncedCustomerCode),
    enabled: !!debouncedCustomerCode && debouncedCustomerCode.trim().length > 2
  })
}

export const useCustomerForAutocomplete = () => {
  return useQuery<ICustomer[]>({
    queryKey: queryKeys.autoComplete.customers,
    queryFn: getCustomersForAutocomplete,
    staleTime: 1000 * 60 * 10
  })
}

