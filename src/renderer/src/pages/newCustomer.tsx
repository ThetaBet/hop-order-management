import { Box, Button, Grid, Paper } from "@mui/material";
import { ECustomerFormType } from "@renderer/components/CustomerForm/contract";
import CustomerForm from "@renderer/components/CustomerForm/CustomerForm";
import { FC, useRef } from "react";

const NewCustomer: FC = () => {
  const submitFormRef = useRef<(() => void) | null>(null);

  const registerSubmit = (submitFn: () => void) => {
    submitFormRef.current = submitFn;
  }

  const handleSubmit = () => {
    if (submitFormRef.current) {
      submitFormRef.current();
    }
  }

  const closeCallback = () => {
    window.api.window.invalidateQueries('customers');
    return window.api.window.closeNewCustomerWindow();
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomerForm type={ECustomerFormType.ADD} isUpdating={true} registerSubmit={registerSubmit} closeCallback={closeCallback} />
      <Grid container spacing={2} pt={2}>
        <Grid size={8} />
        <Grid size={4}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Salva Cliente
          </Button>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  )
}

export default NewCustomer;