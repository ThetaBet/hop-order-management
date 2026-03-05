import { Box, Button, Fade, Grid, Paper, Typography } from '@mui/material'
import { ECustomerFormType } from '@renderer/components/CustomerForm/contract'
import CustomerForm from '@renderer/components/CustomerForm/CustomerForm'
import GenericLoading from '@renderer/components/GenericLoading/GenericLoading'
import { useCustomer } from '@renderer/providers/CustomerProvider'
import { FC, useRef } from 'react'

const EditCustomerContent = () => {
  const { customer, isLoading, error } = useCustomer()
  const submiFormRef = useRef<(() => void) | null>(null)

  if (isLoading) return <GenericLoading />
  if (error)
    return (
      <Typography color="error">Errore nel caricamento del cliente: {error.message}</Typography>
    )
  if (!customer) return <Typography>Cliente non trovato</Typography>

  const registerSubmit = (submitFn: () => void) => {
    submiFormRef.current = submitFn
  }

  const handleSubmit = () => {
    if (submiFormRef.current) {
      submiFormRef.current()
    }
  }

  const closeCallback = () => {
    return window.api.window.closeCustomerDetailWindow()
  }

  return (
      <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomerForm
          customer={customer}
          type={ECustomerFormType.UPDATE}
          isUpdating={true}
          registerSubmit={registerSubmit}
          closeCallback={closeCallback}
        />
        <Grid container spacing={2} pt={2}>
          <Grid size={8} />
          <Grid size={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Aggiorna Cliente
            </Button>
          </Grid>
        </Grid>
      </Paper>
  )
}

export default EditCustomerContent
