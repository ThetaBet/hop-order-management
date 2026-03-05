import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useDeleteCustomer, useGetCustomers } from "@renderer/hooks/useCustomersQuery";
import { useSelectedCustomers } from "@renderer/providers/SelectedCustomerProvider";
import { FC } from "react";
import { actions } from "./config";
import { useCustomers } from "@renderer/providers/CustomersProvider";

const CustomerActions: FC = () => {
  const { customers } = useCustomers();
  const { selectedCustomers } = useSelectedCustomers();
  const deleteCustomer = useDeleteCustomer();
  return (
    <>
      <SpeedDial
        FabProps={{
          color: 'secondary'
        }}
        ariaLabel="customer actions"
        direction="left"
        sx={{ position: 'fixed', top: 80, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() =>
              action.action(
                selectedCustomers || action.id === 'print-customers' ? customers : selectedCustomers,
                deleteCustomer
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
    </>
  )
}

export default CustomerActions;