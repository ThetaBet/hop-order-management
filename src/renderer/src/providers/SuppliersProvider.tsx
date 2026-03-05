import { useGetSuppliers } from '@renderer/hooks/useSuppliersQuery'
import { createContext, useContext } from 'react'
import { ISupplierProviderContext } from './types'
import { useQueryInvalidationListener } from '@renderer/hooks/useQueryInvalidationListener'

const SuppliersContext = createContext<ISupplierProviderContext | null>(null)

const SuppliersProvider = ({ children }) => {
  const { data = [], isLoading, error } = useGetSuppliers()

  useQueryInvalidationListener();

  return (
    <SuppliersContext.Provider value={{ suppliers: data, isLoading, error }}>
      {children}
    </SuppliersContext.Provider>
  )
}

export const useSuppliers = () => {
  const context = useContext(SuppliersContext)
  if (context === null) {
    throw new Error('useSuppliers must be used within a SuppliersProvider')
  }
  return context
}

export default SuppliersProvider
