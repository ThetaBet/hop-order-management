import {  Dialog, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { FC, useState } from "react";
import { actions } from "./config";
import DialogContentComponent from "./OrdersFilterDialog";

const OrdersActions: FC = () => {
  const [open, setOpen] =  useState(false);
  return (
    <>
    <SpeedDial
      FabProps={{
        color: "secondary",
      }}
      ariaLabel="orders actions"
      direction="left"
      sx={{ position: "fixed", top: 80, right: 32 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          onClick={() => action.action(setOpen)}
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
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogContentComponent
        isSettingStartDate={true}
        isSettingEndDate={true}
        setOpen={setOpen}
      />
    </Dialog>
    </>
  )
}

export default OrdersActions;