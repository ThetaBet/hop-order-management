import { queryKeys } from "@renderer/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addOrder, deleteOrder, getLastOrderNumber, getOrderByOrderNumber, getOrders, updateOrderDeliveryStatus, updateOrderPaymentStatus } from "@renderer/dbOperations/orders"

export const useOrders = (startDate?: Date, endDate?: Date, unpaidOnly?: boolean) => {
  return useQuery({
    queryKey: queryKeys.orders.list(startDate, endDate, unpaidOnly),
    queryFn: () => getOrders(startDate, endDate, unpaidOnly),
    staleTime: 1000 * 60 * 5
  })
}

export const useOrderByOrderNumber = (orderNumber: number) => {
  return useQuery({
    queryKey: queryKeys.orders.byNumber(orderNumber),
    queryFn: () => getOrderByOrderNumber(orderNumber),
    staleTime: 1000 * 60 * 5
  })
}

export const useUpdatePaymentStatus = (orderNumber: number, paymentStatus: boolean, customerCode: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateOrderPaymentStatus(orderNumber, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.byNumber(orderNumber) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.byCode(customerCode) });

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('orders').catch(console.error);
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento dello stato di pagamento:", error);
    }
  })
}

export const useUpdateDeliveryStatus = (orderNumber: number, deliveryStatus: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateOrderDeliveryStatus(orderNumber, deliveryStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.byNumber(orderNumber) });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('orders').catch(console.error);
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento dello stato di consegna:", error);
    }
  })
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('orders').catch(console.error);
      }
    },
    onError: (error) => {
      console.error("Errore durante l'eliminazione dell'ordine:", error);
    }
  })
}

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
      if (window.api?.window?.invalidateQueries) {
        window.api.window.invalidateQueries('orders').catch(console.error);
      }
    },
    onError: (error) => {
      console.error("Errore durante l'aggiunta dell'ordine:", error);
    }
  })
}

export const useGetLastOrderNumber = () => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: getLastOrderNumber,
    staleTime: 1000 * 60 * 5
  })
}