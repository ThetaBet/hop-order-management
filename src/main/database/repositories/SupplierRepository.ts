import Database from 'better-sqlite3'
import { DatabaseConnection } from '../DatabaseConnection'
import { ISupplier } from '../types'
import {
  DELETE_SUPPLIER,
  INSERT_SUPPLIER,
  SELECT_ALL_SUPPLIERS,
  SELECT_SUPPLIER_BY_CODE,
  UPDATE_SUPPLIER_BY_CODE,
  SELECT_SUPPLIER_CODE_COUNT
} from '../queries/suppliers'
import log from '../../logger'

interface ISupplierCodeParam {
  supplierCode: string
}

export class SupplierRepository {
  private db: Database.Database

  constructor() {
    this.db = DatabaseConnection.getInstance().getDatabase()
  }

  getSuppliers(): ISupplier[] {
    const stmt = this.db.prepare<[], ISupplier>(SELECT_ALL_SUPPLIERS)
    log.database('Fetched all suppliers')
    return stmt.all()
  }

  addSupplier(supplier: Partial<ISupplier>): void {
    const stmt = this.db.prepare<{}, ISupplier>(INSERT_SUPPLIER)
    const result = stmt.run(supplier)
    log.database(`Supplier added with ID: ${result.lastInsertRowid}`)
  }

  updateSupplier(supplier: Partial<ISupplier>): void {
    const stmt = this.db.prepare<{}, ISupplier>(UPDATE_SUPPLIER_BY_CODE)
    const result = stmt.run(supplier)
    log.database(`Supplier updated with code: ${supplier.supplierCode}, Changes: ${result.changes}`)
  }

  deleteSupplier(supplierCode: string): void {
    const stmt = this.db.prepare<ISupplierCodeParam>(DELETE_SUPPLIER)
    stmt.run({ supplierCode })
    log.database(`Supplier deleted with code: ${supplierCode}`)
  }

  getSupplierByCode(supplierCode: string): ISupplier | null {
    const stmt = this.db.prepare<ISupplierCodeParam, ISupplier>(SELECT_SUPPLIER_BY_CODE)
    const supplier = stmt.get({ supplierCode })
    log.database(`Fetched supplier with code: ${supplierCode}`)
    return supplier || null
  }

  getSupplierCodeCount(supplierCode: string): number {
    const stmt = this.db.prepare<ISupplierCodeParam, { count: number }>(SELECT_SUPPLIER_CODE_COUNT)
    const result = stmt.get({ supplierCode })
    log.database(`Counted suppliers with code: ${supplierCode}, Count: ${result?.count || 0}`)
    return result?.count || 0
  }
}
