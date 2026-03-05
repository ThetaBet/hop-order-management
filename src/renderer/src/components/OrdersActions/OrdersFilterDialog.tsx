import { Button, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers"
import { useOrders } from "@renderer/providers/OrdersProviders"
import { set } from "date-fns"
import { FC, useState } from "react"

export interface IOrdersFilterDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isSettingStartDate?: boolean,
  isSettingEndDate?: boolean
}

const DialogContentComponent: FC<IOrdersFilterDialogProps> = ({
  setOpen,
  isSettingStartDate = false,
  isSettingEndDate = false
}) => {
  const { dates, setDates } = useOrders()
  const [startDate, setStartDate] = useState<Date | null>(dates.startDate || null)
  const [endDate, setEndDate] = useState<Date | null>(dates.endDate || null)
  const saveFilters = () => {
    setDates({ startDate: startDate!, endDate: endDate! })
    setOpen(false)
  }

  const getLabel = () => {
    if (isSettingStartDate && isSettingEndDate) return "Seleziona Range Date"
    if (isSettingStartDate) return "Seleziona Data Inizio"
    if (isSettingEndDate) return "Seleziona Data Fine"
    return ""
  }

  return (
    <>
      <DialogTitle>Filtri Ordini</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{getLabel()}</Typography>
        <Stack spacing={2} mt={2} direction="row">
          {isSettingStartDate && <DateCalendar
            value={startDate}
            onChange={(newValue) =>
              setStartDate(set(newValue!, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }))
            }
          />}
          {isSettingEndDate && <DateCalendar
            value={endDate}
            onChange={(newValue) =>
              setEndDate(set(newValue!, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }))
            }
          />}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Chiudi</Button>
        <Button onClick={() => saveFilters()} autoFocus>
          Applica
        </Button>
      </DialogActions>
    </>
  )
}

export default DialogContentComponent