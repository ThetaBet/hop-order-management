import { format } from "date-fns"
import { it } from "date-fns/locale"

export enum EDateFormat {
  DATE = 'dd/MM/yyyy',
  LONG_DATE = 'dd MMMM yyyy',
  DATE_TIME = 'dd/MM/yyyy HH:mm',
  TIME = 'HH:mm'
}

export const formatDate = (date: Date | string, dateFormat: EDateFormat) => {
  if (!date) {
    throw new Error('No date provided to formatDate')
  }
  if (new Date(date) .toString() === 'Invalid Date') {
    throw new Error('Invalid date provided to formatDate')
  }
  return format(new Date(date), (dateFormat as string), {
    locale: it
  })
}