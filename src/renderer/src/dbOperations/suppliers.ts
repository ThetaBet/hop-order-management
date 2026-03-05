import { ISupplier } from '@renderer/utils/types'

export const getSuppliers = async (): Promise<ISupplier[]> => {
  return await window.api.database.getSuppliers()
}

export const deleteSupplierByCode = async (supplierCode: string): Promise<void> => {
  return await window.api.database.deleteSupplier(supplierCode)
}

export const updateSupplierByCode = async (supplier: ISupplier): Promise<void> => {
  return await window.api.database.updateSupplierByCode(supplier)
}

export const printSelectedSuppliers = async (suppliers): Promise<void> => {
  return await window.api.print.printSuppliers(suppliers)
}

export const addSupplier = async (supplier: ISupplier): Promise<void> => {
  return await window.api.database.addSupplier(supplier)
}

export const getSupplierCodeCount = async (supplierCode: string): Promise<number> => {
  return await window.api.database.getSupplierCodeCount(supplierCode)
}