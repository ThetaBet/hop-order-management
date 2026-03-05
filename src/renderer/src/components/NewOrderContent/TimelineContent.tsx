import { FC } from "react";
import BasicOrderInfo from "./BasicOrderInfo";
import ProductsData from "./ProductsData";
import DeliveryData from "./DeliveryData";
import ReviewOrder from "./ReviewOrder";
import { IOrderInfoProps, ITimelineContentProps } from "./types";
import { Box, Button, Fade, Stack } from "@mui/material";
import { PaperInfoCard } from "../InfoCard/InfoCard";
import DriversProvider from "@renderer/providers/DriversProvider";
import ProductAutocompleteProvider from "@renderer/providers/ProductAutocompleteProvider";

const timelineConfig = [
  {
    step: 0,
    label: 'Informazioni ordine di base',
    Content: (props: IOrderInfoProps) => <BasicOrderInfo {...props}/>,
  }, 
  {
    step: 1,
    label: 'Informazioni prodotti',
    Content: (props: IOrderInfoProps) => <ProductAutocompleteProvider><ProductsData {...props}/></ProductAutocompleteProvider>,
  }, 
  {
    step: 2,
    label: 'Informazioni trasporto',
    Content: (props: IOrderInfoProps) => 

      <DeliveryData {...props}/>

  },
  {
    step: 3,
    label: 'Rivedi ordine',
    Content: (props: IOrderInfoProps) => <ReviewOrder {...props}/>
  }
]

const TimelineContent: FC<ITimelineContentProps> = ({ activeStep, control, onReset, onNext, onBack, customer, setValue }) => (
  <Box
    sx={{
      height: '50%',
      display: 'grid',
      position: 'relative',
      alignItems: 'start',
      gap: 0
    }}
  >
    {timelineConfig.map(({ step, Content, label }) => (
      <Fade in={activeStep === step} key={step}>
          <Box key={step} sx={{ gridArea: '1 / 1 / 2 / 2', height: '100%' }}>
          <PaperInfoCard title={label}>
            <Stack spacing={2} sx={{ height: 'calc(100% - 50px)' }}>
            <Box flexGrow={1}>
              <Content control={control} customer={customer} setValue={setValue}/>
            </Box>
            <Stack direction="row" justifyContent="space-between" mt={2}>
              {activeStep > 0 && <Button color="info" onClick={onBack}>Indietro</Button>}
              {activeStep > 0 && <Button color="error" onClick={onReset}>Reset</Button>}
                <Box flexGrow={1} />
              {activeStep < timelineConfig.length - 1 && <Button variant="contained" color="primary" onClick={onNext}>Avanti</Button>}
            </Stack>
            </Stack>
          </PaperInfoCard>
          </Box>
        </Fade>
    ))}
  </Box>
)

export default TimelineContent;