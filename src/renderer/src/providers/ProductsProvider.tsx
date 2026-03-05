import { useProducts as useProductsQuery } from '@renderer/hooks/useProductsQuery'
import { useQueryInvalidationListener } from '@renderer/hooks/useQueryInvalidationListener'
import { createContext, FC, useContext } from 'react'
import { IProductsProviderContext } from './types'

const ProductsContext = createContext<IProductsProviderContext | null>(null);

interface ProductsProviderProps {
  children: React.ReactNode;
}

const ProductsProvider: FC<ProductsProviderProps> = ({ children }) => {
  const { data = [], isLoading, error, refetch } = useProductsQuery()

  useQueryInvalidationListener()

  return (
    <ProductsContext.Provider
      value={{
        products: data,
        isLoading,
        error,
        refetch: async () => {
          await refetch()
        }
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === null) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export default ProductsProvider
