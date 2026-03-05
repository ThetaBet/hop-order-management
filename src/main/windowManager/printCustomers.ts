import { formatDateTimeForTitle } from "../print/utils";
import  log from "../logger";
import getGenericWindowForPrint, { EPrintFormat } from "./getGenericWindowForPrint";
import { getGenericPrintOptions } from "./config";
import getCustomersTemplate from "../print/customersTemplate";
import { dialog } from "electron";
import fs from "fs/promises";

export const printCustomers = async (customers: any[]) => {
    try {
      const printWindow = getGenericWindowForPrint(EPrintFormat.LANDSCAPE_A4);
      printWindow.setTitle(`distinta_clienti_${formatDateTimeForTitle(new Date())}`);
      const printHtml = getCustomersTemplate(customers);
      await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`);
      try {
        const pdfData = await printWindow.webContents.printToPDF(getGenericPrintOptions(EPrintFormat.LANDSCAPE_A4))
        const { filePath } = await dialog.showSaveDialog({
          defaultPath: `distinta_clienti_${formatDateTimeForTitle(new Date())}.pdf`,
          filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
        });
        if (filePath) {
          await fs.writeFile(filePath, pdfData);
          log.info('Print completed successfully');
        }
        printWindow.close();
       } catch (error) {
        log.error('Print failed: ' + (error as string));
        return { success: false, error: error as string };        
      }
      return { success: true };
    } catch (error) {
      log.error('Error opening print customers window: ' + (error as string));
      return { success: false, error: error as string };
    }
}