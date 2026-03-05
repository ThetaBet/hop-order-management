import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IOrdersProviderContext } from "./types";
import { useOrders as useOrdersQuery } from "@renderer/hooks/useOrdersQuery";
import { useQueryInvalidationListener } from "@renderer/hooks/useQueryInvalidationListener";
import { add, sub } from "date-fns";
import SessionStorage from "@renderer/utils/sessionStorage";

const OrdersContext = createContext<IOrdersProviderContext | null>(null);

interface OrdersProviderProps {
  children: ReactNode;
}

const getInitialStartDate = (): Date => {
  const date = SessionStorage.getItem<Date>("ordersStartDate");
  return date ? new Date(date) : sub(new Date(), { months: 1 });
}

const getInitialEndDate = (): Date => {
  const date = SessionStorage.getItem<Date>("ordersEndDate");
  return date ? new Date(date) : add(new Date(), { days: 1 });
}

const OrdersProvider: FC<OrdersProviderProps> = ({ children }) => {
  const [dates, setDates] = useState<{ startDate?: Date; endDate?: Date }>({startDate: getInitialStartDate(), endDate: getInitialEndDate()});
  const [unpaidOnly, setUnpaidOnly] = useState<boolean>(false);
  const { data= [], isLoading, error } = useOrdersQuery(dates.startDate, dates.endDate, unpaidOnly);
  useQueryInvalidationListener();

  const handleSetDates = (dates: { startDate?: Date; endDate?: Date }) => {
    const { startDate, endDate } = dates;
    if (startDate) {
      SessionStorage.setItem("ordersStartDate", startDate);
    }
    if (endDate) {
      SessionStorage.setItem("ordersEndDate", endDate);
    }
    setDates({ startDate, endDate });
  }

  return (
    <OrdersContext.Provider
      value={{
        orders: data,
        isLoading,
        error,
        setDates: handleSetDates,
        dates,
        unpaidOnly,
        setUnpaidOnly
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === null) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}

export default OrdersProvider;
