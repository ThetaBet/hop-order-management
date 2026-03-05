import React, { createContext, useContext } from 'react'
import { useProduct } from './ProductProvider'
import { useStorageQuantity, useUpdateStorageQuantity } from '@renderer/hooks/useProductsQuery'

type StorageContextType = {
  currentQuantity: number
  save: (newQty: number) => Promise<void>
}

const StorageContext = createContext<StorageContextType | null>(null)

const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { product } = useProduct()

  const productId = product?.id
  const { data } = useStorageQuantity(productId)
  const mutation = useUpdateStorageQuantity()

  const save = async (newQty: number) => {
    if (!productId) return
    await mutation.mutateAsync({ productId, quantity: newQty })
  }

  return (
    <StorageContext.Provider value={{ currentQuantity: data ?? 0, save }}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => {
  const ctx = useContext(StorageContext)
  if (ctx === null) throw new Error('useStorage must be used within a StorageProvider')
  return ctx
}

export default StorageProvider
