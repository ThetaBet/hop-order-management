import { IOrder, TTimeSlot } from "./types";

export const formatTimeSlot = (slot: TTimeSlot | undefined | '') => {
  switch (slot) {
    case 'MORNING':
      return 'Mattina';
    case 'AFTERNOON':
      return 'Pomeriggio';
    case 'EVENING':
      return 'Sera';
    case 'NIGHT':
      return 'Notte';
    case 'BANK_HOLIDAY':
      return 'Festivo';
    default:
      return '';
  }
}

export const formatCustomerAddress = (customer: IOrder['customer']) => {
  if (!customer.address) return '';
  
  const parts: string[] = [];
  
  if (customer.address.street) {
    parts.push(customer.address.street);
  }
  
  const cityPart: string[] = [];
  if (customer.address.zip) cityPart.push(customer.address.zip);
  if (customer.address.city) cityPart.push(customer.address.city);
  if (customer.address.neighborhood) cityPart.push(customer.address.neighborhood);
  
  if (cityPart.length > 0) {
    let cityStr = cityPart.join(' ');
    if (customer.address.provinceCode) {
      cityStr += ` (${customer.address.provinceCode})`;
    }
    parts.push(cityStr);
  } else if (customer.address.provinceCode) {
    parts.push(`(${customer.address.provinceCode})`);
  }
  
  if (customer.address.country) {
    parts.push(customer.address.country);
  }
  
  return parts.join(', ');
}