import { Box,  Typography } from '@mui/material'
import OrdersActions from '@renderer/components/OrdersActions/OrdersActions'
import OrdersTable from '@renderer/components/OrdersList/OrdersTable'
import OrdersProvider from '@renderer/providers/OrdersProviders'
import { type FC } from 'react'

const Orders: FC = () => {
  return (
      <Box height="100%" maxHeight="calc(100% - 160px)" display="flex" flexDirection="column">
        <Typography variant="h5" sx={{ py: 2, mb: 1 }}>
          Lista Ordini
        </Typography>
        <OrdersProvider>
          <OrdersActions />

          <OrdersTable/>
        </OrdersProvider>
      </Box>
  )
}

export default Orders
