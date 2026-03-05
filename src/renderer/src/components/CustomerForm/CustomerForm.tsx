import { useForm } from 'react-hook-form'
import { CustomerFormData, ECustomerFormType, ICustomerFormProps } from './contract'
import { FC, memo, useCallback, } from 'react'
import { ICustomer } from '@renderer/utils/types'
import { useAddOrUpdateCustomer, useCustomerCodeCount } from '@renderer/hooks/useCustomersQuery'
import { CircularProgress, Grid } from '@mui/material'
import Input from '../Form/Input'
import TextArea from '../Form/TextArea'

const CustomerForm: FC<ICustomerFormProps> = ({ customer, isUpdating, type, closeCallback, registerSubmit }) => {
  const query = useAddOrUpdateCustomer(customer?.customerCode || '')
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    mode: 'onChange',
    defaultValues: {
      customerCode: customer?.customerCode || '',
      customerName: customer?.customerName || '',
      notes: customer?.notes || '',
      street: customer?.address?.street || '',
      city: customer?.address?.city || '',
      provinceCode: customer?.address?.provinceCode || '',
      zipCode: customer?.address?.zip || '',
      country: customer?.address?.country || '',
      neighborhood: customer?.address?.neighborhood || '',
      phone: customer?.contact?.phone || '',
      phoneAlt: customer?.contact?.phoneAlt || '',
      email: customer?.contact?.mail || ''
    }
  });

  const { data: codeCount, isLoading: isCheckingCode } = useCustomerCodeCount(watch('customerCode'));
  const isCodeExists = codeCount || 0 > 0;

  const onSubmit = useCallback(async (data: CustomerFormData) => {
    const parsedCustomer: ICustomer = {
      customerCode: data.customerCode,
      customerName: data.customerName,
      notes: data.notes,
      address: {
        street: data.street,
        city: data.city,
        provinceCode: data.provinceCode,
        zip: data.zipCode,
        country: data.country,
        neighborhood: data.neighborhood
      },
      contact: {
        phone: data.phone,
        phoneAlt: data.phoneAlt,
        mail: data.email
      }
    }
    query.mutate(parsedCustomer)
    if (closeCallback) {
      closeCallback()
    }
  }, [query]);

  const onReset = useCallback(() => {
    reset({
      customerCode: customer?.customerCode || '',
      customerName: customer?.customerName || '',
      notes: customer?.notes || '',
      street: customer?.address?.street || '',
      city: customer?.address?.city || '',
      provinceCode: customer?.address?.provinceCode || '',
      zipCode: customer?.address?.zip || '',
      country: customer?.address?.country || '',
      neighborhood: customer?.address?.neighborhood || '',
      phone: customer?.contact?.phone || '',
      phoneAlt: customer?.contact?.phoneAlt || '',
      email: customer?.contact?.mail || ''
    })
  }, [reset, customer]);


  if (registerSubmit) {
    registerSubmit(handleSubmit(onSubmit), onReset);
  }

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={6}>
          <Input
            name="customerCode"
            control={control}
            label="Codice Cliente"
            placeholder="Inserisci il codice cliente"
            required
            disabled={type === ECustomerFormType.UPDATE}
            error={errors.customerCode}
            fullWidth
            rules={{
              pattern: {
                message: 'Il codice cliente può contenere solo lettere e numeri',
                value: /^[a-zA-Z0-9]+$/
              },
              validate: (_value) => (type === ECustomerFormType.ADD && isCodeExists ? 'Il codice cliente esiste già' : true)
            }}
            endAdornment={isCheckingCode ? <CircularProgress size={24}/> : undefined}
          />
        </Grid>
        <Grid size={6} />
        <Grid size={8}>
          <Input
            name="customerName"
            control={control}
            label="Nome Cliente"
            placeholder="Inserisci il nome del cliente"
            required
            error={errors.customerName}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={4} />
        <Grid size={8}>
          <Input
            name="street"
            control={control}
            label="Indirizzo"
            placeholder="Inserisci l'indirizzo"
            required
            error={errors.street}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="city"
            control={control}
            label="Città"
            placeholder="Inserisci la città"
            required
            error={errors.city}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="provinceCode"
            control={control}
            label="Provincia"
            placeholder="Inserisci la provincia"
            error={errors.provinceCode}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="zipCode"
            control={control}
            label="CAP"
            placeholder="Inserisci il CAP"
            error={errors.zipCode}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={4}>
          <Input
            name="country"
            control={control}
            label="Nazione"
            placeholder="Inserisci la nazione"
            error={errors.country}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="neighborhood"
            control={control}
            label="Quartiere/area"
            placeholder="Inserisci il quartiere"
            error={errors.neighborhood}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={6} />
        <Grid size={6}>
          <Input
            name="phone"
            control={control}
            label="Telefono"
            placeholder="Inserisci il numero di telefono"
            required
            error={errors.phone}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={6}>
          <Input
            name="phoneAlt"
            control={control}
            label="Telefono Alternativo"
            placeholder="Inserisci il numero di telefono alternativo"
            error={errors.phoneAlt}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Inserisci l'email"
            error={errors.email}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
            rules={{
              pattern: {
                message: "Inserisci un'email valida",
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              }
            }}
          />
        </Grid>
        <Grid size={12}>
          <TextArea
            name="notes"
            control={control}
            label="Note"
            placeholder="Inserisci eventuali note"
            error={errors.notes}
            fullWidth
            disabled={type === ECustomerFormType.UPDATE && !isUpdating}
            rows={3}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default memo(CustomerForm)
