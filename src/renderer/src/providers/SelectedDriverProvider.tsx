import { createContext, useContext, useState } from "react";
import { ISelectedDriversContext } from "./types";
import { IDriver } from "@renderer/utils/types";

const SelectedDriverContext = createContext<ISelectedDriversContext | null>(null);

const SelectedDriverProvider = ({ children }) => {
  const [selectedDrivers, setSelectedDrivers] = useState<IDriver[]>([]);

  return (
    <SelectedDriverContext.Provider value={{ selectedDrivers, setSelectedDrivers }}>
      {children}
    </SelectedDriverContext.Provider>
  );
};

export const useSelectedDrivers = () => {
  const context = useContext(SelectedDriverContext);
  if (context === null) {
    throw new Error("useSelectedDrivers must be used within a SelectedDriverProvider");
  }
  return context;
};

export default SelectedDriverProvider;