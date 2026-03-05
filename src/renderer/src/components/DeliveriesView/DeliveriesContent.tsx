import { Box, Grid } from '@mui/material'
import { FC } from 'react'
import DateSelectorCard from './DateSelectorCard'
import StatsCard from './StatsCard'
import DriverGroupsCard from './DriverGroupsCard'
import DeliveryChartCard from './DeliveryChartCard'
import DeliveryMapCard from './DeliveryMapCard'
import ActionsCard from './ActionsCard'
import GenericLoading from '../GenericLoading/GenericLoading'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'

const DeliveriesContent: FC = () => {
  const { isLoading, error } = useDeliveries()

  if (isLoading) return <GenericLoading />
  if (error) return <Box py={4}>Errore nel caricamento: {error.message}</Box>

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Row 1: Date selector + Stats */}
        <Grid size={8}>
          <DateSelectorCard />
        </Grid>
        <Grid size={4}>
          <StatsCard />
        </Grid>

        {/* Row 2: Driver groups (full width) */}
        <Grid size={12}>
          <DriverGroupsCard />
        </Grid>

        {/* Row 3: Chart + Map + Actions */}
        <Grid size={4}>
          <DeliveryChartCard />
        </Grid>
        <Grid size={4}>
          <DeliveryMapCard />
        </Grid>
        <Grid size={4}>
          <ActionsCard />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeliveriesContent
