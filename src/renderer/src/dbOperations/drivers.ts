import { IDriver } from "@renderer/utils/types";

export const getDrivers = async (): Promise<IDriver[]> => {
  return await window.api.database.getDrivers();
};

export const getDriverByCode = async (driverCode: string): Promise<IDriver | undefined> => {
  return await window.api.database.getDriverByCode(driverCode);
};

export const addDriver = async (driver: IDriver): Promise<void> => {
  return await window.api.database.addDriver(driver);
};

export const updateDriverByCode = async (driver: IDriver): Promise<void> => {
  return await window.api.database.updateDriver(driver);
};

export const deleteDriverByCode = async (driverCode: string): Promise<void> => {
  return await window.api.database.deleteDriver(driverCode);
};

export const getDriverCodeCount = async (driverCode: string): Promise<number> => {
  return await window.api.database.getDriverCodeCount(driverCode);
}

export const printSelectedDrivers = async (drivers: IDriver[]): Promise<void> => {
  return await window.api.print.printDrivers(drivers);
}