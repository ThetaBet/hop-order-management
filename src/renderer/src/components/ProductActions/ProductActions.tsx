import type { FC } from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { actions } from './config'
import { useSelectedProducts } from '@renderer/providers/SelectedProductProvider'
import { useDeleteProduct } from '@renderer/hooks/useProductsQuery'
import { useProducts } from '@renderer/providers/ProductsProvider'

const ProductActions: FC = () => {
  const { selectedProducts } = useSelectedProducts()
  const { products } = useProducts()
  const deleteProduct = useDeleteProduct()
  return (
    <>
      <SpeedDial
        FabProps={{
          color: 'secondary'
        }}
        ariaLabel="product actions"
        direction="left"
        sx={{ position: 'fixed', top: 80, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() =>
              action.action(
                selectedProducts.length > 0 ? selectedProducts : products,
                deleteProduct
              )
            }
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.tooltip
              }
            }}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default ProductActions
