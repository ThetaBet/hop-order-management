import Database from "better-sqlite3";
import { DatabaseConnection } from "../DatabaseConnection";
import { IDriver } from "../types";
import {
  DELETE_DRIVER,
  INSERT_DRIVER,
  SELECT_ALL_DRIVERS,
  SELECT_DRIVER_BY_CODE,
  SELECT_DRIVER_CODE_COUNT,
  UPDATE_DRIVER_BY_CODE
} from "../queries/drivers";
import log from "../../logger";

interface IDriverCodeParam {
  driverCode: string;
}

export class driverRepository {
  private db: Database.Database;

  constructor() {
    this.db = DatabaseConnection.getInstance().getDatabase();
  }

  getDrivers(): IDriver[] {
    const stmt = this.db.prepare<[], IDriver>(SELECT_ALL_DRIVERS);
    log.database("Fetched all drivers");
    return stmt.all();
  }

  addDriver(driver: Partial<IDriver>): void {
    const stmt = this.db.prepare<{}, IDriver>(INSERT_DRIVER);
    const result = stmt.run(driver);
    log.database(`Driver added with ID: ${result.lastInsertRowid}`);
  }

  updateDriver(driver: Partial<IDriver>): void {
    const stmt = this.db.prepare<{}, IDriver>(UPDATE_DRIVER_BY_CODE);
    const result = stmt.run(driver);
    log.database(`Driver updated with code: ${driver.driverCode}, Changes: ${result.changes}`);
  }

  deleteDriver(driverCode: string): void {
    const stmt = this.db.prepare<IDriverCodeParam>(DELETE_DRIVER);
    stmt.run({ driverCode });
    log.database(`Driver deleted with code: ${driverCode}`);
  }

  getDriverByCode(driverCode: string): IDriver | null {
    const stmt = this.db.prepare<IDriverCodeParam, IDriver>(SELECT_DRIVER_BY_CODE);
    const driver = stmt.get({ driverCode });
    log.database(`Fetched driver with code: ${driverCode}`);
    return driver || null;
  }

  getDriverCodeCount(driverCode: string): number {
    const stmt = this.db.prepare<IDriverCodeParam, { driverCodeCount: number }>(SELECT_DRIVER_CODE_COUNT);
    const result = stmt.get({ driverCode });
    log.database(`Fetched driver code count for code: ${driverCode}`);
    return result?.driverCodeCount || 0;
  }
}