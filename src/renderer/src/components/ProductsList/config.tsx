import { GridColDef } from '@mui/x-data-grid'
import { genericLocaleText } from '@renderer/utils/localizations'
import { formatCurrency, parseInputCurrency, parseOutputCurrency } from '@renderer/utils/number'
import { IProduct, ISupplier } from '@renderer/utils/types'

export enum ProductsPageSize {
  SMALL = 10,
  MEDIUM = 50,
  LARGE = 100
}
export const DEFAULT_PAGE_SIZE = ProductsPageSize.MEDIUM

export const getColumns = (
  suppliers: Partial<ISupplier>[]
): GridColDef<Partial<IProduct>>[] => [
  {
    field: 'productCode',
    headerName: 'Codice prodotto',
    width: 150,
    editable: false
  },
  {
    field: 'productName',
    headerName: 'Nome prodotto',
    width: 300,
    editable: true
  },
  {
    field: 'category',
    headerName: 'Categoria',
    width: 100,
    editable: true
  },
  {
    field: 'netPrice',
    headerName: 'Prezzo netto',
    width: 100,
    editable: true,
    align: 'right',
    valueFormatter: (_value, row) => formatCurrency(row.netPrice?.amount),
    valueGetter: (_value, row) => parseInputCurrency(row.netPrice?.amount?.toString()),
    valueSetter: (value, row) => ({
      ...row,
      netPrice: {
        amount: parseOutputCurrency(value as string),
        currencyCode: row.netPrice?.currencyCode ?? 'EUR'
      }
    }),
    preProcessEditCellProps: (params) => {
      const parsedValue = params.props.value.replace(/\./g, '').replace(',', '.')
      const amount = parseFloat(parsedValue);
      const hasError = isNaN(amount) || amount < 0;
      return { ...params.props, error: hasError }
    }
  },
  {
    field: 'grossPrice',
    headerName: 'Prezzo lordo',
    width: 100,
    editable: false,
    align: 'right',
    valueFormatter: (_value, row) =>
      formatCurrency((Number(row.netPrice?.amount) * (1 + Number(row.taxRate) / 100)).toFixed(2)),
    valueGetter: (_value, row) =>
      (Number(row.netPrice?.amount) * (1 + Number(row.taxRate) / 100)).toFixed(2)
  },
  {
    field: 'taxRate',
    headerName: 'Aliquota IVA',
    width: 100,
    align: 'right',
    editable: true,
    valueFormatter: (_value, row) => (row.taxRate ? `${row.taxRate}%` : '-'),
    valueGetter: (_value, row) => row.taxRate
  },
  {
    field: 'supplierPrice',
    headerName: 'Prezzo fornitore',
    width: 120,
    editable: true,
    align: 'right',
    valueFormatter: (_value, row) =>
      row.supplier?.supplierPrice?.amount
        ? formatCurrency(row.supplier?.supplierPrice?.amount)
        : '-',
    valueGetter: (_value, row) => row.supplier?.supplierPrice?.amount,
    valueSetter: (value, row) => ({
      ...row,
      supplier: {
        ...row.supplier,
        supplierPrice: {
          amount: parseOutputCurrency(value as string),
          currencyCode: row.supplier?.supplierPrice?.currencyCode ?? 'EUR'
        }
      }
    })
  },
  {
    field: 'supplierName',
    headerName: 'Fornitore',
    width: 200,
    editable: true,
    type: 'singleSelect',
    valueGetter: (_value, row) => row.supplier?.supplierId || -1,
    valueFormatter: (_value, row) => row.supplier?.supplierName || '-',
    valueSetter: (value, row) => {
      if (value === -1) {
        return {
          ...row,
          supplier: {
            ...row.supplier,
            supplierId: undefined,
            supplierName: ''
          }
        }
      }
      const selectedSupplier = suppliers.find((supplier) => supplier.id === value)
      return {
        ...row,
        supplier: selectedSupplier
          ? {
              ...row.supplier,
              supplierId: selectedSupplier.id,
              supplierName: selectedSupplier.supplierName
            }
          : row.supplier
      }
    },
    valueOptions: [
      {
        value: -1,
        label: 'Nessun fornitore'
      },
      ...suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.supplierName
      }))
    ]
  }
]

export const localeText = {
  ...genericLocaleText,
  noRowsLabel: 'Nessun prodotto trovato',
  paginationRowsPerPage: 'Prodotti per pagina:',
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} Prodotti selezionati`
      : `${count.toLocaleString()} Prodotto selezionato`
}
