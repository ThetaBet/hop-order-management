import log from "../logger";
import { IDriver } from "../service/types";
import { formatDateTimeForTitle } from "../print/utils";
import getDriverTemplate from "../print/driverTemplate";
import getGenericWindowForPrint from "./getGenericWindowForPrint";
import { getGenericPrintOptions } from "./config";

export const printDrivers = async (drivers: IDriver[]) => {
  try {
    const printWindow = getGenericWindowForPrint();
    printWindow.setTitle(`distinta_autisti_${formatDateTimeForTitle(new Date())}`);
    const printHtml = getDriverTemplate(drivers);
    await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`);
    printWindow.webContents.print(getGenericPrintOptions(), (success, failureReason) => {
      if (success) {
        log.info("Print completed successfully");
      } else {
        log.error(`Print failed: ${failureReason}`);
      }
      printWindow.close();
    });

    return { success: true };
  } catch (error) {
    log.error("Error opening print drivers window: " + (error as string));
    return { success: false, error: error as string };
  }
};