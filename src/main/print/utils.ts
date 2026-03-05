import { TCurrency } from '../service/types'
import { Currencies } from './types'

export const formatDateTimeForTitle = (date: Date) => {
  const parsedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  const parsedTime = `${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`
  return `${parsedDate}_${parsedTime}`
}

export const parseCurrencyForPrint = (price: TCurrency) => {
  if (!price.amount || isNaN(Number(price.amount))) return `-`
  const parsedAmount = price.amount.toFixed(2).replace('.', ',')
  return `${parsedAmount} ${Currencies[price.currencyCode]}`
}

export const parsePercentageForPrint = (percentage: number) => {
  if (percentage == null) return `-`
  return `${percentage}%`
}

export const calcGrossPrice = (netPrice: TCurrency, taxRate: number): number => {
  if (!netPrice.amount || isNaN(Number(netPrice.amount))) return NaN
  return Number(netPrice.amount) * (1 + Number(taxRate) / 100)
}
