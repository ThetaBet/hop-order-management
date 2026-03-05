import { CheckCircle, Error, Paid, PauseCircle, Pending, RunCircle } from '@mui/icons-material'
import { Box, Chip, ChipProps, Stack, Typography } from '@mui/material'
import { useOrder } from '@renderer/providers/OrderProvider'
import { deliveryLabelMap, hasPaymentLeft } from '@renderer/utils/orders'
import { EDeliveryStatus } from '@renderer/utils/types'
import { FC } from 'react'

const getStatusColor = (status: string) => {
  switch (status) {
    case EDeliveryStatus.PENDING:
    case EDeliveryStatus.ON_ROUTE:
      return 'default'
    case EDeliveryStatus.DELIVERED:
      return 'success'
    case EDeliveryStatus.DELAYED:
      return 'warning'
    case EDeliveryStatus.CANCELLED:
      return 'error'
    default:
      return 'default'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case EDeliveryStatus.PENDING:
      return <Pending />
    case EDeliveryStatus.ON_ROUTE:
      return <RunCircle />
    case EDeliveryStatus.DELIVERED:
      return <CheckCircle />
    case EDeliveryStatus.DELAYED:
      return <Error />
    case EDeliveryStatus.CANCELLED:
      return <PauseCircle />
    default:
      return undefined
  }
}

const getStatusChipProps = (status: string): ChipProps => {
  return {
    label: deliveryLabelMap[status] || 'Sconosciuto',
    color: getStatusColor(status),
    size: 'small',
    icon: getStatusIcon(status)
  }
}

const Header: FC = () => {
  const { order } = useOrder()
  if (!order) return null

  return (
    <Box sx={{ py: 2, mb: 1 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" gutterBottom flexGrow={1}>
          Ordine #{order.orderNumber}
        </Typography>
        <Box display="flex" gap={1} sx={{ ml: 'auto' }}>
          <Chip
            label={order.paymentStatus ? 'Pagato' : 'Non Pagato'}
            color={order.paymentStatus ? 'success' : 'warning'}
            size="small"
            icon={order.paymentStatus ? <Paid /> : <Error />}
          />
          <Chip {...getStatusChipProps(order.delivery.status)} />
          {hasPaymentLeft(order) && (
            <Chip label="Pagamenti in sospeso" size="small" color="warning" icon={<Error />} />
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default Header 