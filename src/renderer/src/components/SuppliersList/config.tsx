import { GridColDef } from '@mui/x-data-grid'
import { genericLocaleText } from '@renderer/utils/localizations'
import { ISupplier } from '@renderer/utils/types'

export enum SupplierPageSize {
  SMALL = 5,
  MEDIUM = 10,
  LARGE = 100
}

export const DEFAULT_PAGE_SIZE = SupplierPageSize.MEDIUM

export const getColumns = (): GridColDef<Partial<ISupplier>>[] => [
  {
    field: 'supplierCode',
    headerName: 'Codice fornitore',
    width: 150,
    editable: false
  },
  {
    field: 'supplierName',
    headerName: 'Nome fornitore',
    width: 300,
    editable: true
  },
  {
    field: 'paymentForm',
    headerName: 'Forma di pagamento',
    width: 200,
    editable: true,
    valueFormatter: (_value, row) => row.payment?.paymentForm || '',
    valueGetter: (_value, row) => row.payment?.paymentForm || '',
    valueSetter: (value, row) => ({
      ...row,
      payment: {
        ...row.payment,
        paymentForm: value as string
      }
    })
  },
  {
    field: 'paymentTerms',
    headerName: 'Termini di pagamento',
    width: 200,
    editable: true,
    valueFormatter: (_value, row) => row.payment?.paymentTerms || '',
    valueGetter: (_value, row) => row.payment?.paymentTerms || '',
    valueSetter: (value, row) => ({
      ...row,
      payment: {
        ...row.payment,
        paymentTerms: value as string
      }
    })
  },
  {
    field: 'notes',
    headerName: 'Note',
    width: 300,
    editable: true,
    valueFormatter: (_value, row) => row.notes || '',
    valueGetter: (_value, row) => row.notes || '',
    valueSetter: (value, row) => ({
      ...row,
      notes: value as string
    })
  }
]

const localetext = {
  ...genericLocaleText,
  noRowsLabel: 'Nessun fornitore trovato',
  paginationRowsPerPage: 'Fornitori per pagina:',
  footerRowSelected: (count: number) =>
    count === 1
      ? `${count.toLocaleString()} fornitore selezionato`
      : `${count.toLocaleString()} fornitori selezionati`
}
