import { Box, Typography } from "@mui/material";
import DriverActions from "@renderer/components/DriverActions/DriverActions";
import DriverTable from "@renderer/components/DriversList/DriverTable";
import DriversProvider from "@renderer/providers/DriversProvider";
import SelectedDriverProvider from "@renderer/providers/SelectedDriverProvider";
import { FC } from "react";

const Drivers: FC = () => {
  return (
    <Box height="100%" maxHeight="calc(100vh - 160px)" display="flex" flexDirection="column">
      <Typography variant="h5" sx={{ py: 2, mb: 1 }}>
        Lista autisti
      </Typography>
      <SelectedDriverProvider>
        <DriversProvider>
          <DriverActions />
          <DriverTable />
        </DriversProvider>
      </SelectedDriverProvider>
    </Box>
  )
}

export default Drivers