import { INewOrderProductsFormValues } from "@renderer/components/NewOrderContent/types"

export const formatCurrency = (value: number | string | undefined): string | undefined => {
  if (!value || isNaN(Number(value))) return undefined
  const toLocale = Number(value).toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'EUR'
  })
  return toLocale
}

export const parseInputCurrency = (value: string | undefined): string => {
  const normalized = Number(value).toFixed(2)
  return normalized.replaceAll('.', ',')
}

export const parseOutputCurrency = (value: string | undefined): number => {
  if (!value) return 0
  if (isNaN(Number(value))) {
    const normalized = value
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, '')
    const parsed = parseFloat(normalized)
    if (isNaN(parsed)) return 0
    return parsed
  }
  return Number(value)
}

export const db2Form = (value: number | undefined): string => {
  if (!value || isNaN(Number(value))) return ''
  return value.toFixed(2).replace('.', ',')
}

export const form2Db = (value: string | number | undefined): number => {
  if (!value) return NaN
  const normalized = String(value).replace(',', '.')
  const parsed = parseFloat(normalized)
  if (isNaN(parsed)) return NaN
  return parsed
}

export const getRecap = (products: INewOrderProductsFormValues[]) => {
  const subtotal = products.reduce((acc, item) => acc + (form2Db(item.subtotal) || 0), 0)
  const taxAmount = products.reduce((acc, item) => acc + (form2Db(item.taxAmount) || 0), 0)
  const total = subtotal + taxAmount
  return {
    subtotal,
    taxAmount,
    total
  }
}
