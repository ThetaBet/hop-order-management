import { useAddDriver, useDriverCodeCount } from "@renderer/hooks/useDriversQuery";
import { useForm } from "react-hook-form";
import { IDriver } from "@renderer/utils/types";
import { Button, CircularProgress, Grid } from "@mui/material";
import Input from "../Form/Input";
import { FC } from "react";
import { driverFormData } from "./contract";

const DriverForm: FC = () => {
  const addDriver = useAddDriver();

  const { 
    control, 
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<driverFormData>({
    mode: 'onChange',
    defaultValues: {
      driverCode: '',
      driverName: '',
      phone: ''
    }
  });

  const { data: codeCount, isLoading: isCheckingCode } = useDriverCodeCount(watch('driverCode'));
  const isCodeExists = codeCount || 0 > 0;

  const onSubmit = async (data: driverFormData) => {
    const parsedDriver: IDriver = {
      driverCode: data.driverCode,
      driverName: data.driverName,
      phone: data.phone
    };
    addDriver.mutate(parsedDriver);
    window.api.window.invalidateQueries('drivers');
    window.api.window.closeNewDriverWindow();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Input
            name="driverCode"
            control={control}
            label="Codice Autista"
            placeholder="Inserisci il codice autista"
            required
            error={errors.driverCode}
            fullWidth
            rules={{
              validate: () => !isCodeExists || 'Il codice autista esiste già',
              pattern: {
                value: /^[A-Za-z0-9-_]+$/,
                message:
                  'Il codice autista può contenere solo lettere, numeri, trattini e underscore'
              }
            }}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="driverName"
            control={control}
            label="Nome Autista"
            placeholder="Inserisci il nome autista"
            required
            error={errors.driverName}
            fullWidth
            rules={{ required: 'Il nome autista è obbligatorio' }}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="phone"
            control={control}
            label="Telefono"
            placeholder="Inserisci il numero di telefono"
            error={errors.phone}
            fullWidth
            rules={{
              pattern: {
                value: /^[0-9+\-\s()]*$/,
                message: 'Il numero di telefono contiene caratteri non validi'
              }
            }}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Aggiungi Autista
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default DriverForm;