import { useDrivers as useDriversQuery } from '../hooks/useDriversQuery'
import { useQueryInvalidationListener } from '../hooks/useQueryInvalidationListener'
import { createContext, FC, useContext } from 'react'
import { IDriversProviderContext } from './types'

const DriversContext = createContext<IDriversProviderContext | null>(null);

interface DriversProviderProps {
  children: React.ReactNode;
}

const DriversProvider: FC<DriversProviderProps> = ({ children }) => {
  const { data = [], isLoading, error } = useDriversQuery()

  useQueryInvalidationListener()

  return (
    <DriversContext.Provider
      value={{
        drivers: data,
        isLoading,
        error,
      }}
    >
      {children}
    </DriversContext.Provider>
  )
}

export const useDrivers = () => {
  const context = useContext(DriversContext)
  if (context === null) {
    throw new Error('useDrivers must be used within a DriversProvider')
  }
  return context
}

export default DriversProvider