import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDeleteProduct } from "@renderer/hooks/useProductsQuery";
import { useDrivers } from "@renderer/providers/DriversProvider";
import { useSelectedDrivers } from "@renderer/providers/SelectedDriverProvider";
import { FC } from "react";
import { actions } from "./config";

const DriverActions: FC = () => {
  const { selectedDrivers } = useSelectedDrivers()
  const { drivers } = useDrivers();
  const deleteProduct = useDeleteProduct();
  return (
    <>
      <SpeedDial
        FabProps={{
          color: "secondary",
        }}
        ariaLabel="driver actions"
        direction="left"
        sx={{ position: "fixed", top: 80, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() =>
              action.action(
                selectedDrivers.length > 0 ? selectedDrivers : drivers,
                deleteProduct
              )
            }
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.tooltip,
              },
            }}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default DriverActions