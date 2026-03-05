import { createContext, useContext } from "react";
import { ICustomersProviderContext } from "./types";
import { useQueryInvalidationListener } from "@renderer/hooks/useQueryInvalidationListener";
import { useGetCustomers } from "@renderer/hooks/useCustomersQuery";

const CustomersContext = createContext<ICustomersProviderContext | null>(null);

const CustomersProvider = ({ children }) => {
  const { data = [], isLoading, error } = useGetCustomers();

  useQueryInvalidationListener();

  return (
    <CustomersContext.Provider value={{ customers: data, isLoading, error }}>
      {children}
    </CustomersContext.Provider>
  );
}

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (context === null) {
    throw new Error('useCustomers must be used within a CustomersProvider');
  }
  return context;
}

export default CustomersProvider;
