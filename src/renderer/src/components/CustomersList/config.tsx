import { GridColDef } from "@mui/x-data-grid";
import { genericLocaleText } from "@renderer/utils/localizations";
import { formatCustomerAddress } from "@renderer/utils/string";
import { ICustomer } from "@renderer/utils/types";

export enum CustomersPageSize {
  SMALL = 10,
  MEDIUM = 50,
  LARGE = 100
}
export const DEFAULT_PAGE_SIZE = CustomersPageSize.MEDIUM;

export const localeText = {
  ...genericLocaleText,
  noRowsLabel: 'Nessun cliente trovato',
  paginationRowsPerPage: 'Clienti per pagina:',
  footerRowSelected: (count: number) =>
    count !== 1 
      ? `${count.toLocaleString()} clienti selezionati`
      : `${count.toLocaleString()} cliente selezionato`
}

export const getColumns = (): GridColDef<Partial<ICustomer>>[] => [
  {
    field: 'customerCode',
    headerName: 'Codice cliente',
    width: 150,
    editable: false
  },
  {
    field: 'customerName',
    headerName: 'Nome cliente',
    width: 300,
    editable: true
  },
  {
    field: 'phoneNumber',
    headerName: 'Numero di telefono',
    width: 200,
    editable: true,
    valueGetter: (_value, row) => row.contact?.phone || 'N/A'
  }, 
  {
    field: 'completeAddress',
    headerName: 'Indirizzo',
    width: 400,
    editable: true,
    valueGetter: (_value, row) => formatCustomerAddress(row)
  }
]