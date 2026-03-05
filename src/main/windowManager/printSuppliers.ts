import { formatDateTimeForTitle } from "../print/utils"
import  log from "../logger"
import getGenericWindowForPrint from "./getGenericWindowForPrint"
import { getGenericPrintOptions } from "./config"
import getSupplierTemplate from "../print/supplierTemplate"

export const printSuppliers = async (suppliers: any[]) => {
    try {
        const printWindow = getGenericWindowForPrint()
        printWindow.setTitle(`distinta_fornitori_${formatDateTimeForTitle(new Date())}`);
        const printHtml = getSupplierTemplate(suppliers)
        await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`);

        printWindow.webContents.print(getGenericPrintOptions(), (success, failureReason) => {
            if (success) {
                log.info('Print completed successfully');
            } else {
                log.error(`Print failed: ${failureReason}`);
            }
            printWindow.close();
        });
        return { success: true };
    } catch (error) {
        log.error('Error opening print suppliers window: ' + (error as string));
        return { success: false, error: error as string };
    }
}