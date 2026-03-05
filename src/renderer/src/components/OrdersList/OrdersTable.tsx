import { useOrders } from "@renderer/providers/OrdersProviders";
import { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DEFAULT_ORDERS_PAGE_SIZE, EOrdersPageSize, getColumns, getRowClassName, localeText } from "./config";
import { Button, Stack, styled } from "@mui/material";
import { getBackgroundColor } from "@renderer/utils/styles";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import OrdersFilter from "../CustomToolbar/OrdersFilter";
import { useNavigate } from "react-router-dom";

const StyledDataGrid = styled(DataGrid)(({ theme}) => ({
  '& .MuiDataGrid-row:hover': {
    background: '#f5f9fc',
    cursor: 'pointer'
  },
  '& .data-grid-orders--hasPaymentLeft': {
    ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
      }
    }
  },
  '& .data-grid-orders--deliveryDelayed': {
    ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.4),
      }
    }
  }
}));

const CustomToolbarWithFilters: FC = () => {
  return <CustomToolbar customFilters={<OrdersFilter />} />;
}

const OrdersTable: FC = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error } = useOrders();

  const handleNewOrder = () => {
    navigate('/orders/new');
  }

  if (error) return <div>Errore nel caricamento degli ordini: {error.message}</div>;

  return (
    <>
      <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <Button variant="contained" color="primary" sx={{ ml: 'auto !important' }} onClick={handleNewOrder}>
            Crea Nuovo Ordine
          </Button>
      </Stack>
      <StyledDataGrid
        showToolbar
        slots={{ toolbar: CustomToolbarWithFilters }}
        localeText={localeText}
        loading={isLoading}
        density="standard"
        rows={orders}
        editMode="row"
        columns={[...getColumns()]}
        getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: DEFAULT_ORDERS_PAGE_SIZE
            }
          }
        }}
        pageSizeOptions={[EOrdersPageSize.SMALL, EOrdersPageSize.MEDIUM, EOrdersPageSize.LARGE]}
        disableRowSelectionOnClick
        onRowDoubleClick={(params) => navigate(`/orders/${params.row.orderNumber}/details`)}
      />
    </>
  )
}

export default OrdersTable;