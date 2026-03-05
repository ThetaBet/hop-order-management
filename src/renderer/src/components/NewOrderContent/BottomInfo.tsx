import { FC } from 'react'
import { IOrderInfoProps } from './types'
import { Grid, Paper, Typography } from '@mui/material'
import TextArea from '../Form/TextArea'
import InfoCard from '../InfoCard/InfoCard'
import OrderRecap from './OrderRecap'

const BottomInfo: FC<IOrderInfoProps> = ({ activeStep, customer, control }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <TextArea
            name="notes"
            label="Note ordine"
            placeholder="Inserisci eventuali note per l'ordine"
            fullWidth
            rows={7}
            control={control}
          />
        </Paper>
      </Grid>
      <Grid size={4}>
        <InfoCard title="Note cliente">
          <Typography>{customer?.notes}</Typography>
        </InfoCard>
      </Grid>
      <Grid size={4}>
        <InfoCard title="Riepilogo Ordine">
          <OrderRecap control={control} step={activeStep || 0} />
        </InfoCard>
      </Grid>
    </Grid>
  )
}

export default BottomInfo
