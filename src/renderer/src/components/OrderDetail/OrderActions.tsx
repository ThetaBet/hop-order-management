import { AttachMoney, Delete, MoneyOff, NearMe, NearMeDisabled } from "@mui/icons-material";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useDeleteOrder, useUpdateDeliveryStatus, useUpdatePaymentStatus } from "@renderer/hooks/useOrdersQuery";
import { useOrder } from "@renderer/providers/OrderProvider";
import { EDeliveryStatus } from "@renderer/utils/types";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderAction: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const query = useDeleteOrder()
  const { order } = useOrder();
  const deliveryQuery = useUpdateDeliveryStatus(order?.orderNumber!, order?.delivery.status === EDeliveryStatus.DELIVERED ? false : true);
  const paymentQuery = useUpdatePaymentStatus(order?.orderNumber!, order?.paymentStatus ? false : true, order?.customer.customerCode!);
  
  const handleDelete = () => {
    query.mutate(order?.orderNumber!, {
      onSuccess: () => {
        navigate('/orders');
      }
  });
  }
  
  if (!order) return null 
  return (
    <>
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {order.paymentStatus ? <MoneyOff /> : <AttachMoney />}
              </ListItemIcon>
              <ListItemText primary={order.paymentStatus ? "Segna come non pagato" : "Segna come pagato"} onClick={() => paymentQuery.mutate()} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {order.delivery.status === EDeliveryStatus.DELIVERED ? <NearMeDisabled/> : <NearMe />}
              </ListItemIcon>
              <ListItemText primary={order.delivery.status === EDeliveryStatus.DELIVERED ? "Segna come non consegnato" : "Segna come consegnato"} onClick={() => deliveryQuery.mutate()} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider  />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsOpen(true)}>
              <ListItemIcon>
                <Delete color="error" />
              </ListItemIcon>
              <ListItemText disableTypography 
              primary={<Typography color="error">Elimina ordine</Typography>} />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare l'ordine #{order.orderNumber}? Questa azione non può essere annullata.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color="primary">
              Annulla
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Elimina
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
  </>
  )
}
export default OrderAction;