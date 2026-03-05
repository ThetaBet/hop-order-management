import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import DatePicker from "../Form/DatePicker";
import { INewOrderContentHeaderProps } from "./types";

const Header: FC<INewOrderContentHeaderProps> = ({ control }) => {
  return (
    <Box sx={{ py: 2, mb: 1 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" gutterBottom flexGrow={1}>
          Nuovo Ordine
        </Typography>
        <Box display="flex" gap={1} sx={{ ml: 'auto' }} justifyContent="flex-end">
          <Box width="350px">
            <DatePicker fullWidth control={control} name="orderDate" label="Data ordine" disablePast />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default Header;