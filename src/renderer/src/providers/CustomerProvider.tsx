import { createContext, useContext, useState } from "react";
import { ICustomerProviderContext } from "./types";
import { useCustomerByCode } from "@renderer/hooks/useCustomersQuery";
import { useQueryInvalidationListener } from "@renderer/hooks/useQueryInvalidationListener";

const CustomerContext = createContext<ICustomerProviderContext | null>(null);

const CustomerProvider = ({ children, customerCode }) => {
  const [unpaidOnly, setIsUnpaidOnly] = useState(false);
  const { data = null, isLoading, error} = useCustomerByCode(customerCode, unpaidOnly);
  useQueryInvalidationListener();

  return (
    <CustomerContext.Provider value={{ customer: data, isLoading, error, unpaidOnly, setIsUnpaidOnly }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === null) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}

export default CustomerProvider;
