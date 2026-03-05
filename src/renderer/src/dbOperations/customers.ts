import { ICustomer, IDetailedCustomer } from "@renderer/utils/types";

export const getCustomers = async (): Promise<ICustomer[]> => {
  return await window.api.database.getCustomers();
}

export const updateCustomerByCode = async (customer: ICustomer): Promise<void> => {
  return await window.api.database.updateCustomerByCode(customer);
}

export const addCustomer = async (customer: ICustomer): Promise<void> => {
  return await window.api.database.addCustomer(customer);
}

export const deleteCustomerByCode = async (customerCode: string): Promise<void> => {
  return await window.api.database.deleteCustomer(customerCode);
}

export const getCustomerByCode = async (customerCode: string, unpaidOnly: boolean): Promise<IDetailedCustomer | undefined> => {
  return await window.api.database.getCustomerByCode(customerCode, unpaidOnly);
}

export const getCustomerPaymentStatus = async (customerCode: string): Promise<any> => {
  return await window.api.database.getCustomerPaymentStatus(customerCode);
}

export const getCustomerCompletePaymentStatus = async (customerCode: string): Promise<any> => {
  return await window.api.database.getCustomerCompletePaymentStatus(customerCode);
}

export const getCustomerUnpaidOrdersStatus = async (customerCode: string): Promise<any> => {
  return await window.api.database.getCustomerUnpaidOrdersStatus(customerCode);
}

export const getCustomerCodeCount = async (customerCode: string): Promise<number> => {
  return await window.api.database.getCustomerCodeCount(customerCode);
}

export const getCustomersForAutocomplete = async (): Promise<ICustomer[]> => {
  return await window.api.database.getCustomersForAutocomplete();
}

export const printSelectedCustomers = async (customers: ICustomer[]): Promise<void> => {
  return await window.api.print.printCustomers(customers);
}

export const printCustomerDetails = async (customer: string): Promise<void> => {
  return await window.api.print.printCustomerDetails(customer);
}