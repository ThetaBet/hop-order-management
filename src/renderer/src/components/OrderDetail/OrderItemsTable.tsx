import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useOrder } from "@renderer/providers/OrderProvider";
import { formatCurrency } from "@renderer/utils/number";
import { FC } from "react";

const OrderItemsTable: FC = () => {
  const { order } = useOrder();
  if (!order) return null;

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice prodotto</TableCell>
            <TableCell>Prodotto</TableCell>
            <TableCell align="right">Quantità</TableCell>
            <TableCell align="right">Prezzo Unitario</TableCell>
            <TableCell align="right">IVA %</TableCell>
            <TableCell align="right">Totale Netto</TableCell>
            <TableCell align="right">Totale Lordo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product.productCode}</TableCell>
              <TableCell>{item.product.productName}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.unitPrice.amount)}
              </TableCell>
              <TableCell align="right">{item.product.taxRate}%</TableCell>
              <TableCell align="right">{formatCurrency(item.totalPrice.amount)}</TableCell>
              <TableCell align="right">{formatCurrency(item.totalGrossPrice.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default OrderItemsTable;