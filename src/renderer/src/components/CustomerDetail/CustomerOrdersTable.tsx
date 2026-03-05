import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCustomer } from "@renderer/providers/CustomerProvider";
import { EDateFormat, formatDate } from "@renderer/utils/dates";
import { formatCurrency } from "@renderer/utils/number";
import { deliveryLabelMap } from "@renderer/utils/orders";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CustomerOrderTable: FC = () => {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  if (!customer) return null;

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Numero ordine</TableCell>
            <TableCell>Data ordine</TableCell>
            <TableCell>Data consegna</TableCell>
            <TableCell align="right">Totale ordine</TableCell>
            <TableCell>Stato consegna</TableCell>
            <TableCell>Stato pagamento</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
        {customer.orders.map((order) => (
          <TableRow hover key={order.id} onDoubleClick={() => {navigate(`/orders/${order.orderNumber}/details`)}} >
            <TableCell>{order.orderNumber}</TableCell>
            <TableCell>{order.orderDate ? formatDate(order.orderDate, EDateFormat.DATE) : ''}</TableCell>
            <TableCell>{order.delivery.date ? formatDate(new Date(order.delivery.date), EDateFormat.DATE) : ''}</TableCell>
            <TableCell align="right">{formatCurrency(order.totalAmount.amount)}</TableCell>
            <TableCell>{deliveryLabelMap[order.delivery.status] || 'Sconosciuto'}</TableCell>
            <TableCell>{order.paymentStatus ? 'Pagato' : 'Non pagato'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrderTable;