import { Box, Typography } from "@mui/material";
import CustomerActions from "@renderer/components/CustomerActions/CustomerActions";
import CustomerTable from "@renderer/components/CustomersList/CustomerTable";
import CustomersProvider from "@renderer/providers/CustomersProvider";
import SelectedCustomersProvider from "@renderer/providers/SelectedCustomerProvider";
import { FC } from "react";

const Customers: FC = () => {
  return <Box height="100%" maxHeight="calc(100vh - 160px)" display="flex" flexDirection="column">
    <Typography variant="h5" sx={{ py: 2, mb: 1 }}>
      Lista Clienti
    </Typography>
    <SelectedCustomersProvider>
      <CustomersProvider>
        <CustomerActions />
        <CustomerTable />
      </CustomersProvider>
    </SelectedCustomersProvider>
  </Box>;
}

export default Customers;