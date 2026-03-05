import { Box, Typography } from '@mui/material'
import SupplierActions from '@renderer/components/SupplierActions/SupplierActions'
import SupplierTable from '@renderer/components/SuppliersList/SupplierTable'
import SelectedSupplierProvider from '@renderer/providers/SelectedSupplierProvider'
import SuppliersProvider from '@renderer/providers/SuppliersProvider'
import type { FC } from 'react'

const Suppliers: FC = () => {
  return (
    <Box height="100%" maxHeight="calc(100vh - 160px)" display="flex" flexDirection="column">
      <Typography variant="h5" sx={{ py: 2, mb: 1 }}>
        Lista Fornitori
      </Typography>
      <SelectedSupplierProvider>
        <SuppliersProvider>
          <SupplierActions />
          <SupplierTable />
        </SuppliersProvider>
      </SelectedSupplierProvider>
    </Box>
  )
}

export default Suppliers
