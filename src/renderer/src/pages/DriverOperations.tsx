import { Box, Paper } from "@mui/material";
import DriverForm from "@renderer/components/DriverForm/DriverForm";
import type { FC } from "react";

const DriverOperations: FC = () => {
    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <DriverForm />
            </Paper>
        </Box>
    )
}

export default DriverOperations;