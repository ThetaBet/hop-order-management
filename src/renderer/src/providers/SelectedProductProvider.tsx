import { createContext, useContext, useState } from 'react'
import { ISelectedProductsContext } from './types'
import { IProduct } from '@renderer/utils/types'

const SelectedProductsContext = createContext<ISelectedProductsContext | null>(null)

const SelectedProductsProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])

  return (
    <SelectedProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  )
}

export const useSelectedProducts = () => {
  const context = useContext(SelectedProductsContext)
  if (context === null) {
    throw new Error('useSelectedProducts must be used within a SelectedProductsProvider')
  }
  return context
}

export default SelectedProductsProvider
