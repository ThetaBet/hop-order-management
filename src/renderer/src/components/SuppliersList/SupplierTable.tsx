import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { useSuppliers } from '@renderer/providers/SuppliersProvider'
import { FC, useState } from 'react'
import { localeText } from '../ProductsList/config'
import { DEFAULT_PAGE_SIZE, getColumns, SupplierPageSize } from './config'
import { useDeleteSupplier, useUpdateSupplier } from '@renderer/hooks/useSuppliersQuery'
import { ISupplier } from '@renderer/utils/types'
import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { useSelectedSuppliers } from '@renderer/providers/SelectedSupplierProvider'
import CustomToolbar from '../CustomToolbar/CustomToolbar'

const SupplierToolbar = () => <CustomToolbar />

const SupplierTable: FC = () => {
  const { suppliers, isLoading, error } = useSuppliers()
  const { setSelectedSuppliers } = useSelectedSuppliers()
  const deleteSupplier = useDeleteSupplier()
  const updateSupplier = useUpdateSupplier()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.type === 'exclude' && newSelection.ids.size === 0) {
      return setSelectedSuppliers(suppliers)
    }
    const selectedSuppliers = suppliers.filter((supplier) =>
      newSelection.ids.has(supplier.id as number)
    )
    setSelectedSuppliers(selectedSuppliers)
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    const supplier = suppliers.find((supplier) => supplier.id === id)
    if (supplier) {
      window.confirm(`Sei sicuro di voler eliminare il fornitore ${supplier.supplierName}?`) &&
        deleteSupplier.mutate(supplier.supplierCode)
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
    updateSupplier.mutate(newRow as ISupplier)
    return newRow
  }

  if (error) {
    //TODO: migliorare gestione errori
    return <div>Error loading suppliers</div>
  }

  return (
    <DataGrid
      localeText={localeText}
      slots={{ toolbar: SupplierToolbar}}
      showToolbar
      loading={isLoading}
      density="standard"
      rows={suppliers}
      editMode="row"
      processRowUpdate={processUpdate}
      rowModesModel={rowModesModel}
      onRowSelectionModelChange={handleRowSelectionChange}
      columns={[
        ...getColumns(),
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Azioni',
          width: 150,
          editable: false,
          sortable: false,
          filterable: false,
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
            if (isInEditMode) {
              return [
                <GridActionsCellItem icon={<Save />} label="Save" onClick={handleSaveClick(id)} />,
                <GridActionsCellItem
                  icon={<Cancel />}
                  label="Cancel"
                  onClick={handleCancelClick(id)}
                />
              ]
            }
            return [
              <GridActionsCellItem icon={<Edit />} label="Edit" onClick={handleEditClick(id)} />,
              <GridActionsCellItem
                icon={<Delete />}
                label="Delete"
                onClick={handleDeleteClick(id)}
              />
            ]
          }
        }
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: DEFAULT_PAGE_SIZE
          }
        }
      }}
      pageSizeOptions={[SupplierPageSize.SMALL, SupplierPageSize.MEDIUM, SupplierPageSize.LARGE]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  )
}

export default SupplierTable
