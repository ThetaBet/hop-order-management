import { Box, Paper } from "@mui/material";
import SupplierForm from "@renderer/components/SupplierForm/SupplierForm";
import type { FC } from "react";

const SupplierOperation: FC = () => {
    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <SupplierForm />
            </Paper>
        </Box>
    )
}


export default SupplierOperation;