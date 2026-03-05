import { DeliveryDining, Description, Done, Inventory, People, Preview, Warehouse } from "@mui/icons-material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, TimelineSeparator } from "@mui/lab";
import { Box, Icon, Typography } from "@mui/material";
import { act, FC } from "react";

const timelineItems =[
  {
    Icon: Description,
    label: 'Info ordine',
    step: 0
  },
  {
    Icon: Inventory,
    label: 'Prodotti',
    step: 1
  },
  {
    Icon: DeliveryDining,
    label: 'Trasporto',
    step: 2
  },
  {
    Icon: Preview,
    label: 'Rivedi ordine',
    step: 3
  }
]

const getDotColor = (activeStep: number, step: number) => {
  if (activeStep > step) return 'primary';
  if (activeStep === step) return 'secondary';
  return 'grey';
}

const OrderTimeline: FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <Box>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0
          },
          px: 0,
          py: 0,
          my: 0
        }}
      >
        {timelineItems.map(({ Icon, step, label }) => (
          <TimelineItem key={step} sx={{ minHeight: '120px' }}>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: getDotColor(activeStep, step) + '.main' }} />
              <TimelineDot color={getDotColor(activeStep, step)}>
                {activeStep > step ? <Done /> : <Icon />}
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ pt: '78px', pl: 2, pr: 0 }}>
              <Typography sx={{pr: 0}} variant="subtitle1">{label}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {/* {activeStep === 1 && (
        <Box mt={2} px={1}>
          <Box>
            <Warehouse color="success"></Warehouse> <Typography variant="body2" display="inline">Prodotto disponibile per la quantità inserita</Typography>
          </Box>
          <Box>
            <Warehouse color="warning"></Warehouse> <Typography variant="body2" display="inline">Netto inferiore a 5 unità</Typography>
          </Box>
          <Box>
            <Warehouse color="error"></Warehouse> <Typography variant="body2" display="inline">Prodotto esaurito per la quantità richiesta</Typography>
          </Box>
        </Box>
      )} */}
    </Box>
  )
}

export default OrderTimeline;