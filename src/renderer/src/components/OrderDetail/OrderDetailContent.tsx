import { FC } from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import { useOrder } from '@renderer/providers/OrderProvider'
import Header from './Header'
import { CustomerInfoCard, OrderInfoCard, SubTotalInfoCard } from './InfoCard'
import OrderItemsTable from './OrderItemsTable'
import InfoCard from '../InfoCard/InfoCard'
import OrderACtion from './OrderActions'

const OrderDetailContent: FC = () => {
  const { order, isLoading, error } = useOrder()

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Errore nel caricamento dell'ordine: {error.message}</Typography>
  if (!order) return <Typography>Ordine non trovato</Typography>

  return (
    <Box>
      <Header />
      <Grid container spacing={3}>
        <Grid size={8}>
          <OrderInfoCard />
        </Grid>
        <Grid size={4}>
          <OrderACtion />
        </Grid>
        <Grid size={12}>
          <InfoCard title="Prodotti">
            <OrderItemsTable />
          </InfoCard>
        </Grid>
        <Grid size={4}>
          <CustomerInfoCard />
        </Grid>
        <Grid size={4}>
          {order.notes && (
            <InfoCard title="Note dell'ordine">
              <Typography variant="body1">{order.notes}</Typography>
            </InfoCard>
          )}
        </Grid>
        <Grid size={4}>
          <SubTotalInfoCard />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderDetailContent
