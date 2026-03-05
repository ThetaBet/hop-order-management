import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCustomer } from "@renderer/providers/CustomerProvider";
import { FC } from "react";
import Header from "./Header";
import { CustomerInfoCard, PaymentStatusInfoCard } from "./InfoCards";
import InfoCard from "../InfoCard/InfoCard";
import CustomerOrderTable from "./CustomerOrdersTable";
import CustomerActions from "./CustomerActions";

const CustomerDetailsContent: FC = () => {
  const { customer, isLoading, error } = useCustomer();
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading customer details: {error.message}</Typography>;
  if (!customer) return <Typography>Customer not found</Typography>;

  return (
    <Box>
      <Header />
      <Grid container spacing={3}>
        <Grid size={8}>
          <CustomerInfoCard />
        </Grid>
        <Grid size={4}>
          <CustomerActions />
        </Grid>
        {customer.orders.length > 0 && (
          <Grid size={12}>
            <InfoCard title="Ordini del Cliente">
              <CustomerOrderTable />
            </InfoCard>
          </Grid>
        )}
          <Grid size={7}>
            <InfoCard title="Note del Cliente">
              <Typography variant="body1">{customer.notes || ''}</Typography>
            </InfoCard>
          </Grid>
        <Grid size={5}>
          <PaymentStatusInfoCard />
        </Grid>
      </Grid>
    </Box>
  )

}

export default CustomerDetailsContent;