import DB from '../database/DB'
import { CustomerService } from './CustomerService'
import { DriverService } from './DriverService'
import { OrderService } from './OrderService'
import { ProductService } from './ProductService'
import { SupplierService } from './SupplierService'

export class MainService {
  private static instance: MainService
  private db: DB

  private constructor() {
    this.db = new DB()
  }

  public static getInstance(): MainService {
    if (!MainService.instance) {
      MainService.instance = new MainService()
    }
    return MainService.instance
  }

  protected getDB(): DB {
    return this.db
  }

  public getProductService(): ProductService {
    return new ProductService(this.db)
  }

  public getSupplierService(): SupplierService {
    return new SupplierService(this.db)
  }

  public getCustomerService(): CustomerService {
    return new CustomerService(this.db)
  }

  public getOrderService(): OrderService {
    return new OrderService(this.db)
  }
  public getDriverService(): DriverService {
    return new DriverService(this.db)
  }

}
