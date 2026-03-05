import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDeleteSupplier } from "@renderer/hooks/useSuppliersQuery";
import { useSelectedSuppliers } from "@renderer/providers/SelectedSupplierProvider";
import { useSuppliers } from "@renderer/providers/SuppliersProvider";
import type { FC } from "react";
import actions from "./config";

const SupplierActions: FC = () => {
  const { selectedSuppliers } = useSelectedSuppliers();
  const { suppliers } = useSuppliers();
  const deleteSupplier = useDeleteSupplier();
  return (
    <SpeedDial
        FabProps={{
            color: 'secondary'
        }}
        ariaLabel="supplier actions"
        direction="left"
        sx={{ position: 'fixed', top: 80, right: 32 }}
        icon={<SpeedDialIcon />}
    >
        {actions.map((action) => (
            <SpeedDialAction
                onClick={() =>
                    action.action(
                        selectedSuppliers.length > 0 ? selectedSuppliers : suppliers,
                        deleteSupplier
                    )
                }
                key={action.name}
                icon={action.icon}
                slotProps={{
                    tooltip: {
                        title: action.tooltip
                    }
                }}
            />
        ))}
    </SpeedDial>
  )
};

export default SupplierActions;