import { useCustomer } from "@renderer/providers/CustomerProvider";
import { FC } from "react";
import InfoCard, { InfoLine } from "../InfoCard/InfoCard";
import { formatCustomerAddress } from "@renderer/utils/string";
import { Box } from "@mui/material";
import { formatCurrency } from "@renderer/utils/number";

export const CustomerInfoCard: FC = () => {
  const { customer } = useCustomer();
  if (!customer) return null;
  return (
    <InfoCard title="Dettagli Cliente">
      <Box display="flex" flexDirection="column" gap={1}>
      <InfoLine title="Codice Cliente:" value={customer.customerCode} />
      <InfoLine title="Nome Cliente:" value={customer.customerName} />
      <InfoLine title="Indirizzo:" value={formatCustomerAddress(customer)} />
      <InfoLine title="Email:" value={customer.contact?.mail || '-'} />
      <InfoLine title="Telefono:" value={`${customer.contact?.phone || ''} ${customer.contact?.phoneAlt ? ` - ${customer.contact?.phoneAlt}` : ''}`} />
      </Box>
    </InfoCard>
  )
}

export const PaymentStatusInfoCard: FC = () => {
  const { customer } = useCustomer();
  if (!customer) return null;
  return (
    <InfoCard title="Stato Pagamenti">
      <Box display="flex" flexDirection="column" gap={1}>
        {customer.hasPaymentLeft && (
          <>
          <InfoLine title="Ordini Non Pagati:" value={customer.paymentStatus.unpaidOrdersCount.toString()} />
          <InfoLine color="error.main" title="Importo Totale Non Pagato:" value={formatCurrency(customer.paymentStatus.totalUnpaidAmount)!} />
          </>
        )}
        {!customer.hasPaymentLeft && (
          <InfoLine color="success.main" title="Tutti i pagamenti sono stati effettuati." value="" />
        )}
      </Box>
    </InfoCard>
  )
}