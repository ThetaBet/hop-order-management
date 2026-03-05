export interface ProductFormData {
  productCode: string
  productName: string
  category: string
  netPrice: string | number
  taxRate: number
  supplierId: number | undefined
  grossPrice: number
  supplierPrice?: number
}
