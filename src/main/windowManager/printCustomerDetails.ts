
import log from "../logger";
import getCustomerDetailsTemplate from "../print/customerDetailTemplate";
import { ICustomer } from "../service/types";
import { getGenericPrintOptions } from "./config";
import getGenericWindowForPrint from "./getGenericWindowForPrint";

export const printCustomerDetails = async (customer: ICustomer | null): Promise<void> => {
  if (!customer) {
    log.error('Customer code is required to print customer details.');
    throw new Error('Customer code is required to print customer details.');
  }
  try {
    const printWindow = getGenericWindowForPrint();
    printWindow.setTitle(`dettagli_cliente_${customer.customerName || customer.customerCode}`);
    const printHtml = getCustomerDetailsTemplate(customer);
    await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printHtml)}`);
    printWindow.webContents.print(getGenericPrintOptions(), (success, failureReason) => {
      if (success) {
        log.info('Customer details printed successfully.');
      } else {
        log.error(`Failed to print customer details: ${failureReason}`);
      }
      printWindow.close();
    })
  } catch (error) {
    log.error('Error in printCustomerDetails: ' + (error as string));
    throw error;
  }
}