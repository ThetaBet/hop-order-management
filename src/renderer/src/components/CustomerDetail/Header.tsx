import { Error } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useCustomer } from "@renderer/providers/CustomerProvider";
import { FC } from "react";

const Header: FC = () => {
  const { customer } = useCustomer();
  if (!customer) return null;
  return (
    <Box sx={{ py: 2, mb: 1 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" gutterBottom flexGrow={1}>
          {customer.customerName}
        </Typography>
        <Box display="flex" gap={1} sx={{ ml: 'auto' }}>
          {customer.hasPaymentLeft && <Chip label="Pagamenti in sospeso" size="small" color="warning" icon={<Error />} />}
        </Box>
      </Stack>
    </Box>
  )
}

export default Header;