import type { FC } from 'react'
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { useProducts } from '@renderer/providers/ProductsProvider'
import { DEFAULT_PAGE_SIZE, getColumns, localeText, ProductsPageSize } from './config'
import { useSelectedProducts } from '@renderer/providers/SelectedProductProvider'
import { useSuppliers } from '@renderer/providers/SuppliersProvider'
import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { useState } from 'react'
import { useDeleteProduct, useUpdateProduct } from '@renderer/hooks/useProductsQuery'
import { IProduct } from '@renderer/utils/types'
import CustomToolbar from '../CustomToolbar/CustomToolbar'
import { useNavigate } from 'react-router-dom'

const ProductsCustomToolbar = () => <CustomToolbar />

const ProductTable: FC = () => {
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct()
  const updateProduct = useUpdateProduct()
  const { products, isLoading, error } = useProducts()
  const { suppliers, error: errorSuppliers } = useSuppliers()
  const { setSelectedProducts } = useSelectedProducts()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.type === 'exclude' && newSelection.ids.size === 0) {
      return setSelectedProducts(products)
    }
    const selectedProducts = products.filter((product) =>
      newSelection.ids.has(product.id as number)
    )
    setSelectedProducts(selectedProducts)
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    const product = products.find((product) => product.id === id)
    if (product) {
      window.confirm(`Sei sicuro di voler eliminare il prodotto ${product.productName}?`) &&
        deleteProduct.mutate(product.productCode)
    }
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })
  }

  const processUpdate = (newRow: GridRowModel) => {
    updateProduct.mutate(newRow as IProduct)
    return newRow
  }

    const handleRowModesModelChange = (newModel: GridRowModesModel) => {
      Object.keys(newModel).find(
        (key) => newModel[key]?.mode !== rowModesModel[key]?.mode
      );
      setRowModesModel(newModel)
    }


  if (error || errorSuppliers) return <div>Error loading products</div>

  return (
        <DataGrid
          slots={{ toolbar: ProductsCustomToolbar}}
          showToolbar
          localeText={localeText}
          loading={isLoading}
          density="standard"
          rows={products}
          editMode="row"
          rowModesModel={rowModesModel}
          processRowUpdate={processUpdate}
          columns={[
            ...getColumns(suppliers),
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: DEFAULT_PAGE_SIZE
              }
            }
          }}
          pageSizeOptions={[ProductsPageSize.SMALL, ProductsPageSize.MEDIUM, ProductsPageSize.LARGE]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelectionChange}
          onRowDoubleClick={(params) => navigate(`/products/${params.row.productCode}/details`)}
        />

  )
}

export default ProductTable
