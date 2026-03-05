import type { FC } from 'react'
import SuppliersProvider from '@renderer/providers/SuppliersProvider'
import { Box, Paper } from '@mui/material'
import ProductForm from '@renderer/components/ProductForm/ProductForm'
import { useParams } from 'react-router-dom'
import ProductProvider, { useProduct } from '@renderer/providers/ProductProvider'
import { IProduct } from '@renderer/utils/types'

const ProductOperation: FC = () => {
  const params = useParams();
  return (
      <Box height="100%" display="flex" flexDirection="column">
        <SuppliersProvider>
          <ProductProvider productCode={params.productCode}>
          <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <FormWrapper />
          </Paper>
          </ProductProvider>
        </SuppliersProvider>
      </Box>
  )
}

const FormWrapper: FC = () => {
  const { product, isLoading, error } = useProduct();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <ProductForm product={product} />
  )
}

export default ProductOperation
