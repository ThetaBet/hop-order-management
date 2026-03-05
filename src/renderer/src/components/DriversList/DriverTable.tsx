import { DataGrid, GridActionsCellItem, GridRowId, GridRowModel, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";
import { useDeleteDriver, useUpdateDriver } from "@renderer/hooks/useDriversQuery";
import { useDrivers } from "@renderer/providers/DriversProvider";
import { useSelectedDrivers } from "@renderer/providers/SelectedDriverProvider";
import { IDriver } from "@renderer/utils/types";
import { FC, useState } from "react";
import GenericLoading from "../GenericLoading/GenericLoading";
import { DEFAULT_PAGE_SIZE, DriversPageSize, getColumns, localeText } from "./config";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import CustomToolbar from "../CustomToolbar/CustomToolbar";

const DriverCustomToolbar = () => <CustomToolbar />;

const DriverTable: FC = () => {
  const deleteDriver = useDeleteDriver();
  const updateDriver = useUpdateDriver();
  const { drivers, isLoading, error } = useDrivers();
  const { setSelectedDrivers } = useSelectedDrivers();
  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});
  
  const handleRowSelectionChange = (newSelection: any) => {
    if (newSelection.type === "exclude" && newSelection.ids.size === 0) {
      return setSelectedDrivers(drivers);
    }
    const selectedDrivers = drivers.filter((driver) =>
      newSelection.ids.has(driver.id as number)
    );
    setSelectedDrivers(selectedDrivers);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  
  const handleDeleteClick = (id: GridRowId) => () => {
    const driver = drivers.find((driver) => driver.id === id);
    if (driver) {
      window.confirm(`Sei sicuro di voler eliminare l'autista ${driver.driverName}?`) &&
        deleteDriver.mutate(driver.driverCode);
    }
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  }

  const processUpdate = (newRow: GridRowModel) => {
    updateDriver.mutate(newRow as IDriver);
    return newRow; 
  }


  if (error) return <div>Errore nel caricamento degli autisti: {error.message}</div>;

  return (
    <DataGrid
      slots={{ toolbar: DriverCustomToolbar}}
      showToolbar
      localeText={localeText}
      loading={isLoading}
      density="standard"
      rows={drivers}
      editMode="row"
      rowModesModel={rowModesModel}
      processRowUpdate={processUpdate}
      columns={[
        ...getColumns(),
        {
          field: "actions",
          type: "actions",
          headerName: "Azioni",
          width: 150,
          editable: false,
          sortable: false,
          filterable: false,
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            if (isInEditMode) {
              return [
                <GridActionsCellItem icon={<Save />} label="Salva" onClick={handleSaveClick(id)} />,
                <GridActionsCellItem icon={<Cancel />} label="Annulla" onClick={handleCancelClick(id)} />
              ];
            } else {
              return [
                <GridActionsCellItem icon={<Edit />} label="Modifica" onClick={handleEditClick(id)} />,
                <GridActionsCellItem icon={<Delete />} label="Elimina" onClick={handleDeleteClick(id)} />
              ];
            }
          },
        }
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: DEFAULT_PAGE_SIZE,
          }
        }
      }}
      pageSizeOptions={[DriversPageSize.SMALL, DriversPageSize.MEDIUM, DriversPageSize.LARGE]}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={handleRowSelectionChange}
    />
  )
}

export default DriverTable;