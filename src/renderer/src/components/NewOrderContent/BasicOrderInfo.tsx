import { Grid } from "@mui/material";
import { FC } from "react";
import { useCustomerAutocomplete } from "@renderer/providers/CustomerAutocompleteProvider";
import AutoComplete from "../Form/AutoComplete";
import { IOrderInfoProps } from "./types";
import { InfoLine, InfoList } from "../InfoCard/InfoCard";

const BasicOrderInfo: FC<IOrderInfoProps> = ({ control, customer }) => {
  const { customers, isLoading } = useCustomerAutocomplete();

  return (<Grid container spacing={2}>
    <Grid size={6}>
      <AutoComplete
        name="customer"
        required
        control={control}
        label="Cliente"
        fullWidth
        loading={isLoading}
        options={customers.map(customer => ({ label: `(${customer.customerCode}) ${customer.customerName}`, value: customer.id, id: customer.id, key: customer.id, code: customer.customerCode, name: customer.customerName }))}
        
      />
    </Grid>
    <Grid size={6}/>
    <Grid size={6}>
      <InfoList>
      <InfoLine isListItem title="Codice Cliente:" value={customer?.customerCode || ''}/>
      <InfoLine isListItem title="Cliente:" value={customer?.customerName || ''}/>
      <InfoLine isListItem title="Numero di telefono:" value={`${customer?.contact?.phone || ''}${customer?.contact?.phoneAlt ? ` - ${customer.contact.phoneAlt}` : ''}`}/>
      <InfoLine isListItem title="Email:" value={customer ? `${customer.contact?.mail ? customer.contact.mail : '-'}` : ''}/>
      </InfoList>
    </Grid>
    <Grid size={6}>
      <InfoList>
      <InfoLine isListItem title="Indirizzo:" value={customer?.address?.street || ''}/>
      <InfoLine isListItem title="Città:" value={`${customer?.address?.city || ''}${customer?.address?.provinceCode ? ` (${customer.address.provinceCode})` : ''}`}/>
      <InfoLine isListItem title="Area/quartiere:" value={customer?.address?.neighborhood || ''}/>
      <InfoLine isListItem title="CAP:" value={customer?.address?.zip || ''}/>
      <InfoLine isListItem title="Paese:" value={customer?.address?.country || ''}/>
      </InfoList>
    </Grid>
  </Grid>);
}

export default BasicOrderInfo;