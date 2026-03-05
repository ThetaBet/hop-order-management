import { DEFAULT_CURRENCY_CODE } from '../constants'
import DB from '../database/DB'
import log from '../logger'
import { IProduct } from './types'
import { IProduct as IProductDB } from '../database/types'

export class ProductService {
  private db: DB

  constructor(db: DB) {
    this.db = db
  }

  parseProduct(product: IProductDB): IProduct {
    return {
      id: product.id,
      productCode: product.productCode,
      productName: product.productName,
      category: product.category,
      storageQuantity: product.storageQuantity || 0,
      netPrice: {
        amount: product.netPrice,
        currencyCode: DEFAULT_CURRENCY_CODE
      },
      taxRate: product.taxRate,
      supplier: {
        supplierName: product.supplierName,
        supplierId: product.supplierId,
        supplierPrice: {
          amount: product.supplierPrice || 0,
          currencyCode: DEFAULT_CURRENCY_CODE
        }
      }
    }
  }

  parseProductDB(
    product: IProduct
  ): Omit<IProductDB, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isActive'> {
    return {
      id: product.id,
      productCode: product.productCode,
      productName: product.productName,
      category: product.category,
      netPrice: product.netPrice.amount,
      taxRate: product.taxRate,
      supplierId: product.supplier.supplierId,
      supplierName: product.supplier.supplierName,
      supplierPrice: product.supplier.supplierPrice?.amount
    }
  }

  getProducts(): IProduct[] {
    try {
      const rawProducts = this.db.getProducts()
      return rawProducts.map((product) => this.parseProduct(product))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  addProduct(product: IProduct) {
    try {
      this.db.addProduct(this.parseProductDB(product))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  updateProductByCode(product: IProduct) {
    try {
      this.db.updateProductByCode(this.parseProductDB(product))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  deleteProductByCode(productCode: string) {
    try {
      this.db.deleteProductByCode(productCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getProductByCode(productCode: string): IProduct | null {
    try {
      const rawProduct = this.db.getProductByCode(productCode)
      if (!rawProduct) return null
      return this.parseProduct(rawProduct)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getProductCodeCount(productCode: string): number {
    try {
      return this.db.getProductCodeCount(productCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getProductsForAutocomplete(): IProduct[] {
    try {
      const rawProducts = this.db.getProductsForAutocomplete()
      return rawProducts.map((product) => this.parseProduct(product))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getStorageQuantity(productId: number): number {
    try {
      return this.db.getStorageQuantity(productId)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  updateStorageQuantity(productId: number, quantity: number) {
    try {
      this.db.updateStorageQuantity(productId, quantity)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }
}
