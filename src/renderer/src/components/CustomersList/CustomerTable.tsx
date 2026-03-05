import { DataGrid, GridRowModel, GridRowModesModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { useUpdateCustomer } from "@renderer/hooks/useCustomersQuery";
import { useCustomers } from "@renderer/providers/CustomersProvider";
import { useSelectedCustomers } from "@renderer/providers/SelectedCustomerProvider";
import { ICustomer } from "@renderer/utils/types";
import { FC, useState } from "react";
import { CustomersPageSize, DEFAULT_PAGE_SIZE, getColumns, localeText } from "./config";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import { useNavigate } from "react-router-dom";

const CustomerCustomToolbar = () => <CustomToolbar />;

const CustomerTable: FC = () => {
  const navigate = useNavigate();
  const updateCustomer = useUpdateCustomer();
  const { customers, isLoading, error } = useCustomers();
  const [rowModesModel] = useState<GridRowModesModel>({});
  const { setSelectedCustomers } = useSelectedCustomers();
  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.type === 'exclude' && newSelection.ids.size === 0) {
      return setSelectedCustomers(customers);
    }
    const selectedCustomers = customers.filter((customer) =>
      newSelection.ids.has(customer.id as number)
    );
    setSelectedCustomers(selectedCustomers);
  };

  const processUpdate = (newRow: GridRowModel) => {
    updateCustomer.mutate(newRow as ICustomer);
    return newRow;
  }


  if (error) return <div>Error loading customers: {error.message}</div>;

  return (
    <DataGrid
      sx={{
        '& .MuiDataGrid-row:hover': {
          background: '#f5f9fc',
          cursor: 'pointer'
        }
      }}
      slots={{ toolbar: CustomerCustomToolbar}}
      showToolbar
      localeText={localeText}
      loading={isLoading}
      density="standard"
      rows={customers}
      editMode="row"
      rowModesModel={rowModesModel}
      processRowUpdate={processUpdate}
      columns={[
        ...getColumns()
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: DEFAULT_PAGE_SIZE
          }
        }
      }}
      pageSizeOptions={[CustomersPageSize.SMALL, CustomersPageSize.MEDIUM, CustomersPageSize.LARGE]}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={handleRowSelectionChange}
      onRowDoubleClick={(params) => navigate(`/customers/${params.row.customerCode}/details`)}
    />
  )
}
export default CustomerTable;