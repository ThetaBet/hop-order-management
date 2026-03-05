import DB from '../database/DB'
import log from '../logger'
import { ISupplier } from './types'
import { ISupplier as ISupplierDB } from '../database/types'

export class SupplierService {
  private db: DB
  constructor(db: DB) {
    this.db = db
  }

  parseSupplier(supplier: ISupplierDB): ISupplier {
    return {
      id: supplier.id,
      supplierCode: supplier.supplierCode,
      supplierName: supplier.supplierName,
      payment: {
        paymentForm: supplier.paymentForm,
        paymentTerms: supplier.paymentTerms
      },
      notes: supplier.notes
    }
  }

  parseSupplierDB(
    supplier: ISupplier
  ): Omit<ISupplierDB, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isActive'> {
    return {
      id: supplier.id,
      supplierCode: supplier.supplierCode,
      supplierName: supplier.supplierName,
      paymentForm: supplier.payment.paymentForm,
      paymentTerms: supplier.payment.paymentTerms,
      notes: supplier.notes
    }
  }

  getSuppliers(): ISupplier[] {
    try {
      const rawSuppliers = this.db.getSuppliers()
      return rawSuppliers.map((supplier) => this.parseSupplier(supplier))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  addSupplier(supplier: ISupplier) {
    try {
      this.db.addSupplier(this.parseSupplierDB(supplier))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  updateSupplier(supplier: ISupplier) {
    try {
      this.db.updateSupplier(this.parseSupplierDB(supplier))
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  deleteSupplier(supplierCode: string) {
    try {
      this.db.deleteSupplier(supplierCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getSupplierByCode(supplierCode: string): ISupplier | null {
    try {
      const rawSupplier = this.db.getSupplierByCode(supplierCode)
      if (!rawSupplier) return null
      return this.parseSupplier(rawSupplier)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }

  getSupplierCodeCount(supplierCode: string): number {
    try {
      return this.db.getSupplierCodeCount(supplierCode)
    } catch (error) {
      log.error(error as string)
      throw error
    }
  }
}
