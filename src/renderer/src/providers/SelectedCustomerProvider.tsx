import { createContext, useContext, useState } from "react";
import { ISelectedCustomersContext } from "./types";
import { ICustomer } from "@renderer/utils/types";

const selectedCustomersProviderContext = createContext<ISelectedCustomersContext | null>(null);

const SelectedCustomersProvider = ({ children }) => {
  const [selectedCustomers, setSelectedCustomers] = useState<ICustomer[]>([]);

  return (
    <selectedCustomersProviderContext.Provider value={{ selectedCustomers, setSelectedCustomers }}>
      {children}
    </selectedCustomersProviderContext.Provider>
  );
}

export const useSelectedCustomers = () => {
  const context = useContext(selectedCustomersProviderContext);
  if (context === null) {
    throw new Error("useSelectedCustomers must be used within a SelectedCustomersProvider");
  }
  return context;
}

export default SelectedCustomersProvider;