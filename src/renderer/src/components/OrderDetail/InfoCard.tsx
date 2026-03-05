import { useOrder } from "@renderer/providers/OrderProvider"
import { FC } from "react"
import { Box, Divider, Grid, Typography } from "@mui/material"
import { EDateFormat, formatDate } from "@renderer/utils/dates"
import { formatCustomerAddress, formatTimeSlot } from "@renderer/utils/string"
import { hasPaymentLeft } from "@renderer/utils/orders"
import { formatCurrency } from "@renderer/utils/number"
import InfoCard, { InfoLine } from "../InfoCard/InfoCard"

export const OrderInfoCard: FC = () => {
  const { order } = useOrder()
  if (!order) return null
  return (
    <InfoCard title="Dettagli Ordine">
      <Grid container spacing={2}>
        <Grid size={6}>
          <Box display="flex" flexDirection="column" gap={1}>
            <InfoLine title="Numero Ordine:" value={order.orderNumber?.toString() || ''} />
            <InfoLine
              title="Data Ordine:"
              value={
                order.orderDate ? formatDate(new Date(order.orderDate), EDateFormat.DATE) : '-'
              }
            />
            <InfoLine
              title="Data Consegna:"
              value={
                order.delivery.date
                  ? formatDate(new Date(order.delivery.date), EDateFormat.DATE)
                  : '-'
              }
            />
            <InfoLine
              title="Fascia Oraria Consegna:"
              value={formatTimeSlot(order.delivery.timeSlot) || '-'}
            />
          </Box>
        </Grid>
        <Grid size={6}>
          <Box display="flex" flexDirection="column" gap={1}>
            <InfoLine
              title="Indirizzo Consegna:"
              value={order.delivery.deliveryAddress || formatCustomerAddress(order.customer)}
            />
            <InfoLine title="Autista:" value={order.driver.driverName || '-'} />
          </Box>
        </Grid>
      </Grid>
    </InfoCard>
  )
}

export const CustomerInfoCard: FC = () => {
  const { order } = useOrder()
  if (!order) return null
  return (
    <InfoCard title="Dettagli Cliente">
      <Box display="flex" flexDirection="column" gap={1}>
        <InfoLine title="Codice Cliente:" value={order.customer.customerCode || '-'} />
        <InfoLine title="Nome Cliente:" value={order.customer.customerName || '-'} />
        <InfoLine title="Indirizzo:" value={formatCustomerAddress(order.customer)} />
        <InfoLine title="Email:" value={order.customer.contact?.mail || '-'} />
        <InfoLine title="Telefono:" value={`${order.customer.contact?.phone || ''} ${order.customer.contact?.phoneAlt ? ` - ${order.customer.contact?.phoneAlt}` : ''}`} />
        {hasPaymentLeft(order) && (
          <>
            <Divider sx={{ my: 1 }} />
            <InfoLine title="Pagamenti in sospeso:" value={order.customerPaymentStatus.unpaidOrdersCount.toString()}/>
            <InfoLine color="error.main" title="Importo Totale Non Pagato:" value={formatCurrency(order.customerPaymentStatus.totalUnpaidAmount)!}/>
          </>
        )}
      </Box>
    </InfoCard>
  )
}

export const SubTotalInfoCard: FC = () => {
  const { order } = useOrder()
  if (!order) return null
  return (
    <InfoCard title="Riepilogo Importi">
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="flex-end" justifyContent="space-between">
          <Typography variant="subtitle2" gutterBottom>
            Totale netto:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {formatCurrency(order.subtotalAmount.amount)!}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="flex-end" justifyContent="space-between">
          <Typography variant="subtitle2" gutterBottom>
            Totale IVA:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {formatCurrency(order.taxAmount.amount)!}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="flex-end" justifyContent="space-between">
          <Typography variant="subtitle2" gutterBottom>
            Importo Totale:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {formatCurrency(order.totalAmount.amount)!}
          </Typography>
        </Box>
      </Box>
    </InfoCard>
  )
}