import { FC } from "react";
import { IOrderInfoProps } from "./types";
import { Grid, Stack, Typography } from "@mui/material";
import InfoCard from "../InfoCard/InfoCard";

const SideInfo: FC<IOrderInfoProps> = ({ control, customer, activeStep }) => {
  return (
    <Grid size={3}>
      <Stack spacing={2} sx={{ height: '100%' }}>
        <InfoCard title="Note cliente">
          <Typography>{customer?.notes}</Typography>
        </InfoCard>
        <InfoCard title="Riepilogo Ordine">Contenuto riepilogo ordine</InfoCard>
      </Stack>
    </Grid>
  )
}

export default SideInfo;