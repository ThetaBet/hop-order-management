import { createContext, useContext, useState } from 'react'
import { ISelectedSuppliersContext } from './types'
import { ISupplier } from '@renderer/utils/types'

const SelectedSuppliersContext = createContext<ISelectedSuppliersContext | null>(null)

const SelectedSupplierProvider = ({ children }) => {
  const [selectedSuppliers, setSelectedSuppliers] = useState<ISupplier[]>([])

  return (
    <SelectedSuppliersContext.Provider value={{ selectedSuppliers, setSelectedSuppliers }}>
      {children}
    </SelectedSuppliersContext.Provider>
  )
}

export const useSelectedSuppliers = () => {
  const context = useContext(SelectedSuppliersContext)
  if (context === null) {
    throw new Error('useSelectedSuppliers must be used within a SelectedSupplierProvider')
  }
  return context
}

export default SelectedSupplierProvider
