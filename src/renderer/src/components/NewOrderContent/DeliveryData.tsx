import { FC } from "react";
import { IOrderInfoProps } from "./types";
import { Grid } from "@mui/material";
import DatePicker from "../Form/DatePicker";
import Select from "../Form/Select";
import { useDrivers } from "@renderer/providers/DriversProvider";
import Input from "../Form/Input";

const DeliveryData: FC<IOrderInfoProps> = ({ control }) => {
  const { drivers } = useDrivers();
  return (
    <Grid container spacing={2}>
      <Grid size={4} />
      <Grid size={5}>
        <Select
          name="timeSlot"
          label="Fascia oraria"
          placeholder="Seleziona una fascia oraria"
          required
          fullWidth
          control={control}
          options={[
            { label: 'Mattina (8:00 - 12:00)', value: 'MORNING' },
            { label: 'Pomeriggio (13:00 - 17:00)', value: 'AFTERNOON' },
            { label: 'Sera (18:00 - 21:00)', value: 'EVENING' },
            { label: 'Consegna notturna (22:00 - 6:00)', value: 'NIGHT' },
            { label: 'Consegna in giorno festivo', value: 'BANK_HOLIDAY' },
            { label: 'Consegna in tutta la giornata', value: 'ALL_DAY' }
          ]}
        />
      </Grid>
      <Grid size={3}>
        <DatePicker
          name="deliveryDate"
          label="Data di consegna"
          placeholder="Inserisci la data di consegna"
          required
          fullWidth
          control={control}
          disablePast
        />
      </Grid>
      <Grid size={8}>
        <Input
          name="deliveryAddress"
          label="Indirizzo di consegna"
          placeholder="Inserisci l'indirizzo di consegna"
          required
          fullWidth
          control={control}
        />
      </Grid>
      <Grid size={4}>
        <Select
          name="driverId"
          label="Autista"
          placeholder="Seleziona un autista"
          required
          fullWidth
          control={control}
          options={[...drivers.map((driver) => ({ value: driver.id, label: driver.driverName , id: driver.id, key: driver.id, code: driver.driverCode }))]}
        />
      </Grid>
    </Grid>
  )
}

export default DeliveryData;