import { createContext, useContext } from "react";
import { IOrderProviderContext } from "./types";
import { useOrderByOrderNumber } from "@renderer/hooks/useOrdersQuery";

const OrderContext = createContext<IOrderProviderContext | null>(null);

interface OrderProviderProps {
  children: React.ReactNode;
  orderNumber: number;  
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children, orderNumber }) => {
  const { data = null, isLoading, error } = useOrderByOrderNumber(orderNumber); 
  return (
    <OrderContext.Provider value={{ order: data, isLoading, error }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === null) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

export default OrderProvider;