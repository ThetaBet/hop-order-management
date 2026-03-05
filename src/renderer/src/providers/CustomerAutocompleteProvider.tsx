import { useCustomerForAutocomplete } from "@renderer/hooks/useCustomersQuery";
import { createContext, useContext } from "react"
import { ICustomersProviderContext } from "./types";

const CustomerAutocompleteContext = createContext<ICustomersProviderContext | null>(null);
const CustomerAutocompleteProvider = ({ children }) => {
  const { data: customers = [], isLoading, error } = useCustomerForAutocomplete();
  
  return (
    <CustomerAutocompleteContext.Provider value={{ customers, isLoading, error }}>
      {children}
    </CustomerAutocompleteContext.Provider>
  );
}

export const useCustomerAutocomplete = () => {
  const context = useContext(CustomerAutocompleteContext);
  if (context === null) {
    throw new Error('useCustomerAutocomplete must be used within a CustomerAutocompleteProvider');
  }
  return context;
}

export default CustomerAutocompleteProvider;