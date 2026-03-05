import { IProduct } from '@renderer/utils/types'

export const getProducts = async (): Promise<IProduct[]> => {
  return await window.api.database.getProducts()
}

export const updateProductByCode = async (product: IProduct): Promise<void> => {
  return await window.api.database.updateProductByCode(product)
}

export const addProduct = async (product: IProduct): Promise<void> => {
  return await window.api.database.addProduct(product)
}

export const deleteProductByCode = async (productCode: string): Promise<void> => {
  return await window.api.database.deleteProduct(productCode)
}

export const getProductByCode = async (productCode: string): Promise<IProduct | undefined> => {
  return await window.api.database.getProductByCode(productCode)
}

export const getStorageQuantity = async (productId: number): Promise<number> => {
  return await window.api.database.getStorageQuantity(productId)
}

export const updateStorageQuantity = async (productId: number, quantity: number): Promise<void> => {
  return await window.api.database.updateStorageQuantity(productId, quantity)
}

export const getProductCodeCount = async (productCode: string): Promise<number> => {
  return await window.api.database.getProductCodeCount(productCode)
}

export const printSelectedProducts = async (products): Promise<void> => {
  return await window.api.print.printProducts(products)
}

export const getProductsForAutocomplete = async (): Promise<IProduct[]> => {
  return await window.api.database.getProductsForAutocomplete()
}
