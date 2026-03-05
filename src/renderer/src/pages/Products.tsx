import type { FC } from 'react'
import ProductsProvider from '@renderer/providers/ProductsProvider'
import ProductActions from '@renderer/components/ProductActions/ProductActions'
import ProductTable from '@renderer/components/ProductsList/ProductTable'
import { Box, styled, Typography } from '@mui/material'
import SelectedProductsProvider from '@renderer/providers/SelectedProductProvider'
import SuppliersProvider from '@renderer/providers/SuppliersProvider'

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  '& .Mui-error': {
    backgroundColor: 'rgb(126,10,15, 0.1)',
    color: theme.palette.error.main,
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgb(126,10,15, 0)'
    })
  }
}))

const Products: FC = () => {
  return (
    <StyledBox height="100%" maxHeight="calc(100vh - 160px)" display="flex" flexDirection="column">
      <Typography variant="h5" sx={{ py: 2, mb: 1 }}>
        Lista Prodotti
      </Typography>
      <SelectedProductsProvider>
        <ProductsProvider>
          <SuppliersProvider>
            <ProductActions />
            <ProductTable />
          </SuppliersProvider>
        </ProductsProvider>
      </SelectedProductsProvider>
    </StyledBox>
  )
}

export default Products
