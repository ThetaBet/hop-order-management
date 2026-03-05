import {
  CheckCircle,
  ExpandMore,
  LocalShipping,
  NearMe,
  Person,
  Phone
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { EDeliveryStatus, IOrder } from '@renderer/utils/types'
import { FC, useCallback } from 'react'
import { PaperInfoCard } from '../InfoCard/InfoCard'
import { IDriverGroup } from './types'
import { formatCurrency } from '@renderer/utils/number'
import { formatTimeSlot } from '@renderer/utils/string'
import { deliveryLabelMap } from '@renderer/utils/orders'
import { useUpdateDeliveryStatus } from '@renderer/hooks/useOrdersQuery'

const statusColorMap: Record<EDeliveryStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  [EDeliveryStatus.DELIVERED]: 'success',
  [EDeliveryStatus.PENDING]: 'warning',
  [EDeliveryStatus.ON_ROUTE]: 'info',
  [EDeliveryStatus.DELAYED]: 'error',
  [EDeliveryStatus.CANCELLED]: 'default'
}

const OrderRow: FC<{ order: IOrder }> = ({ order }) => {
  const deliveryMutation = useUpdateDeliveryStatus(
    order.orderNumber!,
    order.delivery.status === EDeliveryStatus.DELIVERED ? false : true
  )

  const handleToggleDelivered = useCallback(() => {
    deliveryMutation.mutate()
  }, [deliveryMutation])

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        opacity: order.delivery.status === EDeliveryStatus.DELIVERED ? 0.7 : 1,
        bgcolor:
          order.delivery.status === EDeliveryStatus.DELIVERED
            ? 'rgba(46, 125, 50, 0.04)'
            : order.delivery.status === EDeliveryStatus.DELAYED
              ? 'rgba(200, 47, 10, 0.04)'
              : 'transparent'
      }}
    >
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          #{order.orderNumber}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          {order.customer?.customerName || '-'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {order.customer?.customerCode}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {order.delivery.deliveryAddress || '-'}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{formatTimeSlot(order.delivery.timeSlot) || '-'}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontFamily="monospace">
          {formatCurrency(order.totalAmount?.amount)}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={deliveryLabelMap[order.delivery.status]}
          color={statusColorMap[order.delivery.status]}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell align="center">
        <Tooltip
          title={
            order.delivery.status === EDeliveryStatus.DELIVERED
              ? 'Segna come non consegnato'
              : 'Segna come consegnato'
          }
        >
          <IconButton
            size="small"
            onClick={handleToggleDelivered}
            color={order.delivery.status === EDeliveryStatus.DELIVERED ? 'success' : 'default'}
          >
            {order.delivery.status === EDeliveryStatus.DELIVERED ? (
              <CheckCircle />
            ) : (
              <NearMe />
            )}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

const DriverGroupAccordion: FC<{ group: IDriverGroup }> = ({ group }) => {
  const progress = group.totalOrders > 0 ? (group.deliveredCount / group.totalOrders) * 100 : 0

  return (
    <Accordion
      defaultExpanded
      sx={{
        '&:before': { display: 'none' },
        borderRadius: '12px !important',
        mb: 1,
        boxShadow: '0px 2px 8px rgba(2, 136, 209, 0.06)',
        border: '1px solid #f0f0f0'
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box display="flex" alignItems="center" gap={2} width="100%">
          <Box
            sx={{
              bgcolor: '#e1f5fe',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Person sx={{ color: '#0288d1' }} />
          </Box>

          <Box flexGrow={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle1" fontWeight={600}>
                {group.driverName}
              </Typography>
              {group.phone && (
                <Chip
                  icon={<Phone />}
                  label={group.phone}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Stack>
            <Box display="flex" alignItems="center" gap={2} mt={0.5}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  width: 120,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: progress === 100 ? '#2e7d32' : '#0288d1',
                    borderRadius: 3
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {group.deliveredCount}/{group.totalOrders} consegnati
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<LocalShipping />}
              label={`${group.totalOrders} ordini`}
              color="primary"
              size="small"
            />
            {group.pendingCount > 0 && (
              <Chip label={`${group.pendingCount} in attesa`} color="warning" size="small" />
            )}
          </Stack>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: 90 }}>Ordine</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 200 }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Indirizzo</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100 }}>Fascia</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 100 }} align="right">
                  Importo
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: 110 }}>Stato</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }} align="center">
                  Azione
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {group.orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}

const DriverGroupsCard: FC = () => {
  const { driverGroups, isLoading } = useDeliveries()

  if (isLoading) {
    return (
      <PaperInfoCard title="Ordini per Autista">
        <Box py={4} display="flex" justifyContent="center">
          <LinearProgress sx={{ width: '60%' }} />
        </Box>
      </PaperInfoCard>
    )
  }

  if (driverGroups.length === 0) {
    return (
      <PaperInfoCard title="Ordini per Autista">
        <Box py={6} display="flex" flexDirection="column" alignItems="center" gap={1}>
          <LocalShipping sx={{ fontSize: 48, color: '#bdbdbd' }} />
          <Typography variant="body1" color="text.secondary">
            Nessun ordine per questa data
          </Typography>
        </Box>
      </PaperInfoCard>
    )
  }

  return (
    <PaperInfoCard title="Ordini per Autista">
      <Box mt={1}>
        {driverGroups.map((group) => (
          <DriverGroupAccordion key={group.driverCode} group={group} />
        ))}
      </Box>
    </PaperInfoCard>
  )
}

export default DriverGroupsCard
