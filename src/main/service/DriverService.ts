import DB from "../database/DB";
import { IDriver as IDriverDB } from "../database/types";
import { IDriver } from "./types";
import log from "../logger";

export class DriverService {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  parseDriver(driver: IDriverDB): IDriver {
    return {
      id: driver.id,
      driverCode: driver.driverCode,
      driverName: driver.driverName,
      phone: driver.phone || undefined
    };
  }

  parseDriverDb(driver: IDriver): Omit<IDriverDB, "createdAt" | "updatedAt" | "deletedAt" | "isActive"> {
    return {
      id: driver.id!,
      driverCode: driver.driverCode,
      driverName: driver.driverName,
      phone: driver.phone
    };
  }
  
  getDrivers(): IDriver[] {
    try {
      const rawDrivers = this.db.getDrivers();
      return rawDrivers.map((driver) => this.parseDriver(driver));
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }

  addDriver(driver: IDriver): void {
    try {
      const driverDb = this.parseDriverDb(driver);
      this.db.addDriver(driverDb);
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }
  updateDriver(driver: IDriver): void {
    try {
      const driverDb = this.parseDriverDb(driver);
      this.db.updateDriver(driverDb);
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }
  
  deleteDriver(driverCode: string): void {
    try {
      this.db.deleteDriver(driverCode);
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }
  getDriverByCode(driverCode: string): IDriver | null {
    try {
      const driverDb = this.db.getDriverByCode(driverCode);
      if (driverDb) {
        return this.parseDriver(driverDb);
      }
      return null;
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }
  getDriverCodeCount(driverCode: string): number {
    try {
      return this.db.getDriverCodeCount(driverCode);
    } catch (error) {
      log.error(error as string);
      throw error;
    }
  }

}