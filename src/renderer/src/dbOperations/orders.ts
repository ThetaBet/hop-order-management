import { INewOrder } from "@renderer/utils/types";

export const getOrders = async (startDate?: Date, endDate?: Date, unpaidOnly?: boolean): Promise<any[]> => {
  return await window.api.database.getOrders(startDate, endDate, unpaidOnly);
}

export const getOrderByOrderNumber = async (orderNumber: number): Promise<any | undefined> => {
  return await window.api.database.getOrderByOrderNumber(orderNumber);
}

export const updateOrderPaymentStatus = async (orderNumber: number, paymentStatus: boolean): Promise<void> => {
  return await window.api.database.updateOrderPaymentStatus(orderNumber, paymentStatus);
}

export const updateOrderDeliveryStatus = async (orderNumber: number, deliveryStatus: boolean): Promise<void> => {
  return await window.api.database.updateOrderDeliveryStatus(orderNumber, deliveryStatus);
}

export const deleteOrder = async (orderNumber: number): Promise<void> => {
  return await window.api.database.deleteOrder(orderNumber);
}

export const addOrder = async (order: INewOrder): Promise<void> => {
  return await window.api.database.addOrder(order);
}

export const getLastOrderNumber = async (): Promise<number> => {
  return await window.api.database.getLastOrderNumber();
}