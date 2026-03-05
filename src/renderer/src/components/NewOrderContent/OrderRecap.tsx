import { FC, useMemo } from "react";
import { IOrderRecapProps } from "./types";
import { useFormState, useWatch } from "react-hook-form";
import { db2Form, form2Db, getRecap } from "@renderer/utils/number";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

const OrderRecap: FC<IOrderRecapProps> = ({ control, step }) => {
  const state = useFormState({ control });
  const [ products ] = useWatch({
    control,
    name: [
      'products',
    ]
  });

  const recap = useMemo(() => {
    return getRecap(products);
  }, [products]);

  return (
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Stack spacing={1} sx={{ minWidth: '300px' }}>
         <Stack direction="row" justifyContent="space-between">
           <Typography variant="body2">Subtotale:</Typography>
           <Typography variant="body2">{db2Form(recap.subtotal) || '0,00'} €</Typography>
         </Stack>
         <Stack direction="row" justifyContent="space-between">
           <Typography variant="body2">IVA Totale:</Typography>
           <Typography variant="body2">{db2Form(recap.taxAmount) || '0,00'} €</Typography>
         </Stack>
         <Divider />
         <Stack direction="row" justifyContent="space-between">
           <Typography variant="body1" fontWeight="bold">Totale Ordine:</Typography>
           <Typography variant="body1" fontWeight="bold" color="primary">
             {db2Form(recap.total) || '0,00'} €
           </Typography>
         </Stack>
        </Stack>
        <Button type="submit" disabled={!state.isValid || step !== 3} size="small" fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => {}}>
          Crea ordine
        </Button>
         </Box>
  );
}

export default OrderRecap;