import Database from 'better-sqlite3'
import { DatabaseConnection } from '../DatabaseConnection'
import { IProduct } from '../types'
import {
  DELETE_PRODUCT,
  INSERT_PRODUCT,
  SELECT_ALL_PRODUCTS,
  SELECT_PRODUCT_BY_CODE,
  SELECT_PRODUCT_CODE_COUNT,
  SELECT_PRODUCTS_FOR_AUTOCOMPLETE,
  UPDATE_PRODUCT_BY_CODE
} from '../queries/products'
import { SELECT_STORAGE_QUANTITY_BY_PRODUCT_ID, SET_STORAGE_QUANTITY } from '../queries/products'
import log from '../../logger'

interface IProductCodeParam {
  productCode: string
}

export class ProductRepository {
  private db: Database.Database

  constructor() {
    this.db = DatabaseConnection.getInstance().getDatabase()
  }

  getProducts(): IProduct[] {
    const stmt = this.db.prepare<[], IProduct>(SELECT_ALL_PRODUCTS)
    log.database('Fetched all products')
    return stmt.all()
  }

  addProduct(product: Partial<IProduct>): void {
    const stmt = this.db.prepare<{}, IProduct>(INSERT_PRODUCT)
    const result = stmt.run(product)
    log.database(`Product added with ID: ${result.lastInsertRowid}`)
  }

  updateProductByCode(product: Partial<IProduct>): void {
    const stmt = this.db.prepare<{}, IProduct>(UPDATE_PRODUCT_BY_CODE)
    const result = stmt.run(product)
    log.database(`Product updated with ID: ${result.lastInsertRowid}, Changes: ${result.changes}`)
  }

  deleteProductByCode(productCode: string): void {
    const stmt = this.db.prepare<{}, IProductCodeParam>(DELETE_PRODUCT)
    stmt.run({ productCode })
    log.database(`Product deleted with code: ${productCode}`)
  }

  getProductByCode(productCode: string): IProduct | null {
    const stmt = this.db.prepare<IProductCodeParam, IProduct>(SELECT_PRODUCT_BY_CODE)
    const product = stmt.get({ productCode })
    log.database(`Fetched product with code: ${productCode}`)
    return product || null
  }

  getProductCodeCount(productCode: string): number {
    const stmt = this.db.prepare<IProductCodeParam, { count: number }>(SELECT_PRODUCT_CODE_COUNT)
    const result = stmt.get({ productCode })
    log.database(`Counted products with code: ${productCode}, Count: ${result?.count || 0}`)
    return result?.count || 0
  }

  getProductsForAutocomplete(): IProduct[] {
    const stmt = this.db.prepare<[], IProduct>(SELECT_PRODUCTS_FOR_AUTOCOMPLETE)
    log.database('Fetched products for autocomplete')
    return stmt.all()
  }

  getStorageQuantity(productId: number): number {
    const stmt = this.db.prepare<{ productId: number }, { quantity: number }>(SELECT_STORAGE_QUANTITY_BY_PRODUCT_ID)
    const result = stmt.get({ productId })
    log.database(`Fetched storage quantity for productId: ${productId}, Quantity: ${result?.quantity ?? 0}`)
    return result?.quantity ?? 0
  }

  updateStorageQuantity(productId: number, quantity: number): void {
    const stmt = this.db.prepare(SET_STORAGE_QUANTITY)
    stmt.run({ productId, quantity })
    log.database(`Set storage for productId: ${productId} to quantity: ${quantity}`)
  }
}
