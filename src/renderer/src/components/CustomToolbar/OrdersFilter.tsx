import { Chip, Dialog, Stack, Typography } from "@mui/material";
import { useOrders } from "@renderer/providers/OrdersProviders";
import { EDateFormat, formatDate } from "@renderer/utils/dates";
import { FC, useState } from "react";
import DialogContentComponent from "../OrdersActions/OrdersFilterDialog";

const OrdersFilter: FC = () => {
    const [openStart, setOpenStart] = useState(false)
    const [openEnd, setOpenEnd] = useState(false)
    const { dates, unpaidOnly, setUnpaidOnly } = useOrders()
  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 'auto' }}>
        <Typography variant="body2" fontWeight="bold">
          Ordini filtrati:
        </Typography>
        <Chip
          onClick={() => {
            setOpenStart(true)
          }}
          label={`Dal: ${formatDate(dates.startDate!, EDateFormat.DATE)} `}
          variant="outlined"
        />
        <Chip
          onClick={() => {
            setOpenEnd(true)
          }}
          label={`Al: ${formatDate(dates.endDate!, EDateFormat.DATE)} `}
          variant="outlined"
        />
        <Chip
          onClick={() => {
            setUnpaidOnly(!unpaidOnly)
          }}
          label={unpaidOnly ? 'Mostra: solo Non Pagati' : 'Mostra: tutti gli Ordini'}
          color={unpaidOnly ? 'secondary' : 'default'}
          variant="outlined"
        />
      </Stack>
      <Dialog open={openStart} onClose={() => setOpenStart(false)} maxWidth="xl">
        <DialogContentComponent isSettingStartDate={true} setOpen={setOpenStart} />
      </Dialog>
      <Dialog open={openEnd} onClose={() => setOpenEnd(false)} maxWidth="xl">
        <DialogContentComponent isSettingEndDate={true} setOpen={setOpenEnd} />
      </Dialog>
    </>
  )
}
export default OrdersFilter