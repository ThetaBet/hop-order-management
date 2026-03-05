import { CheckCircle, Print } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material'
import { useDeliveries } from '@renderer/providers/DeliveriesProvider'
import { EDeliveryStatus } from '@renderer/utils/types'
import { FC, useCallback, useState } from 'react'
import { PaperInfoCard } from '../InfoCard/InfoCard'
import { IDriverGroup } from './types'

const ActionsCard: FC = () => {
  const { driverGroups, orders, stats } = useDeliveries()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [batchProcessing, setBatchProcessing] = useState(false)

  const pendingOrders = orders.filter(
    (o) => o.delivery.status !== EDeliveryStatus.DELIVERED
  )

  const handlePrintDdt = useCallback(async () => {
    try {
      await window.api.print.printDeliveryDdt(driverGroups)
    } catch (error) {
      console.error('Errore durante la stampa DDT:', error)
    }
  }, [driverGroups])

  const handlePrintDriverDdt = useCallback(
    async (group: IDriverGroup) => {
      try {
        await window.api.print.printDeliveryDdt([group])
      } catch (error) {
        console.error('Errore durante la stampa DDT autista:', error)
      }
    },
    []
  )

  const handleMarkAllDelivered = useCallback(async () => {
    setBatchProcessing(true)
    try {
      for (const order of pendingOrders) {
        await window.api.database.updateOrderDeliveryStatus(order.orderNumber!, true)
      }
      if (window.api?.window?.invalidateQueries) {
        await window.api.window.invalidateQueries('orders')
      }
    } catch (error) {
      console.error('Errore aggiornamento stato consegne:', error)
    } finally {
      setBatchProcessing(false)
      setConfirmOpen(false)
    }
  }, [pendingOrders])

  return (
    <PaperInfoCard title="Azioni Rapide">
      <Stack spacing={1.5} mt={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Print />}
          onClick={handlePrintDdt}
          disabled={orders.length === 0}
          fullWidth
        >
          Stampa DDT Consegne
        </Button>

        {driverGroups.length > 1 &&
          driverGroups.map((group) => (
            <Button
              key={group.driverCode}
              variant="outlined"
              size="small"
              startIcon={<Print />}
              onClick={() => handlePrintDriverDdt(group)}
              fullWidth
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              DDT {group.driverName}
            </Button>
          ))}

        <Box pt={1}>
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            onClick={() => setConfirmOpen(true)}
            disabled={pendingOrders.length === 0 || batchProcessing}
            fullWidth
            sx={{
              bgcolor: '#2e7d32',
              '&:hover': { bgcolor: '#1b5e20' },
              color: '#fff'
            }}
          >
            {batchProcessing
              ? 'Aggiornamento in corso...'
              : `Segna tutti come consegnati (${pendingOrders.length})`}
          </Button>
        </Box>

        {stats.totalOrders > 0 && (
          <Box pt={1}>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
              {stats.totalDrivers} autist{stats.totalDrivers === 1 ? 'a' : 'i'} ·{' '}
              {stats.totalOrders} ordin{stats.totalOrders === 1 ? 'e' : 'i'}
            </Typography>
          </Box>
        )}
      </Stack>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Conferma consegne</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Stai per segnare {pendingOrders.length} ordin
            {pendingOrders.length === 1 ? 'e' : 'i'} come consegnat
            {pendingOrders.length === 1 ? 'o' : 'i'}. Questa azione è reversibile dalla scheda
            ordine. Vuoi continuare?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Annulla</Button>
          <Button onClick={handleMarkAllDelivered} variant="contained" color="success" autoFocus>
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </PaperInfoCard>
  )
}

export default ActionsCard
