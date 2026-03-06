import { Error } from "@mui/icons-material"
import { Chip, Stack } from "@mui/material"
import { GridColDef, GridRenderCellParams, GridRowClassNameParams, GridValidRowModel } from "@mui/x-data-grid"
import { EDateFormat, formatDate } from "@renderer/utils/dates"
import { genericLocaleText } from "@renderer/utils/localizations"
import { formatCurrency, parseInputCurrency } from "@renderer/utils/number"
import { deliveryLabelMap, hasPaymentLeft } from "@renderer/utils/orders"
import { formatTimeSlot } from "@renderer/utils/string"
import { EDeliveryStatus, IOrder } from "@renderer/utils/types"

export enum EOrdersPageSize {
  SMALL = 25,
  MEDIUM = 50,
  LARGE = 100
}

export const DEFAULT_ORDERS_PAGE_SIZE = EOrdersPageSize.MEDIUM

export const getColumns = (): GridColDef<Partial<IOrder>>[] => [
  {
    field: 'orderNumber',
    headerName: 'Numero Ordine',
    width: 150,
    editable: false
  },
  {
    field: 'customerName',
    headerName: 'Cliente',
    width: 300,
    editable: false,
    renderCell: (params: GridRenderCellParams<any, string>) => {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <span title={params.value || ''}>{params.value}</span>
          {hasPaymentLeft(params.row as IOrder) && (
            <Chip label="Pagamenti in sospeso" size="small" color="warning" icon={<Error />} />
          )}
        </Stack>
      )
    },
    valueGetter: (_value, row) => row.customer?.customerName || ''
  },
  {
    field: 'orderDate',
    headerName: 'Data Ordine',
    width: 150,
    editable: false,
    type: 'date',
    valueGetter: (_value, row) =>
      row.orderDate ? formatDate(new Date(row.orderDate), EDateFormat.DATE) : null,
    valueFormatter: (_value, row) => {
      return formatDate(new Date(row.orderDate!), EDateFormat.DATE)
    }
  },
  {
    field: 'deliveryDate',
    headerName: 'Data Consegna',
    width: 150,
    editable: false,
    type: 'date',
    valueGetter: (_value, row) =>
      `${row.delivery?.date ? formatDate(new Date(row.delivery.date), EDateFormat.DATE) : ''}`,
    valueFormatter: (_value, row) =>
      `${formatDate(new Date(row.delivery?.date!), EDateFormat.DATE)} ${row.delivery?.timeSlot ? `- ${formatTimeSlot(row.delivery.timeSlot)}` : ''}`
  },
  {
    field: 'totalAmount',
    headerName: 'Importo Totale',
    width: 150,
    align: 'right',
    valueFormatter: (_value, row) => formatCurrency(row.totalAmount?.amount),
    valueGetter: (_value, row) => parseInputCurrency(row.totalAmount?.amount?.toString()),
    editable: false
  },
  {
    field: 'deliveryStatus',
    headerName: 'Stato Consegna',
    type: 'singleSelect',
    width: 150,
    valueGetter: (_value, row) =>
      row.delivery?.status ? row.delivery.status : EDeliveryStatus.PENDING,
    valueFormatter: (_value, row) =>
      row.delivery?.status ? deliveryLabelMap[row.delivery?.status] : EDeliveryStatus.PENDING,
    valueOptions: [{
      value: '', label: 'Tutti gli stati'
    },{
      value: EDeliveryStatus.PENDING, label: deliveryLabelMap[EDeliveryStatus.PENDING]
    }, {
      value: EDeliveryStatus.DELIVERED,
      label: deliveryLabelMap[EDeliveryStatus.DELIVERED]
    }, {
      value: EDeliveryStatus.DELAYED,
      label: deliveryLabelMap[EDeliveryStatus.DELAYED]
    }, {
      value: EDeliveryStatus.CANCELLED,
      label: deliveryLabelMap[EDeliveryStatus.CANCELLED]
    }],
    editable: false
  },
  {
    field: 'paymentStatus',
    headerName: 'Stato Pagamento',
    width: 150,
    editable: false,
    type: 'boolean'
  }
]

export const getRowClassName = (params: GridRowClassNameParams<GridValidRowModel>) => {
  const row = params.row as IOrder
  if (row.delivery.status === EDeliveryStatus.DELAYED) {
    return 'data-grid-orders--deliveryDelayed'
  }
  return ''
}

export const localeText = {
  ...genericLocaleText,
  noRowsLabel: 'Nessun ordine trovato',
  paginationRowsPerPage: 'Ordini per pagina:',
  footerRowSelected: (count) =>
    count > 1 ? `${count.toLocaleString()} ordini selezionati` : `${count.toLocaleString()} ordine selezionato`,
  filterValueAny: 'Qualsiasi Stato',
  filterValueTrue: 'Pagato',
  filterValueFalse: 'Non Pagato'
}

