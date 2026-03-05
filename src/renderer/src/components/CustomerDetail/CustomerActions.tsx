import { Add, Delete, Edit } from "@mui/icons-material"
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useDeleteCustomer } from "@renderer/hooks/useCustomersQuery";
import { useCustomer } from "@renderer/providers/CustomerProvider"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerActions = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const query = useDeleteCustomer();

  const handleDelete = () => {
    query.mutate(customer?.customerCode!, {
      onSuccess: () => navigate(-1)
    });
  }

  const handleNewOrder = () => {
    navigate(`/orders/new?customerCode=${customer?.customerCode}`);
  }

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleNewOrder}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Nuovo ordine" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => window.api.window.openCustomerDetailWindow(customer?.customerCode!)}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Modifica dettagli" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(true)}>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                <ListItemText
                  disableTypography={true}
                  primary={<Typography color="error">Elimina cliente</Typography>}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare il cliente "{customer?.customerName}"? Questa azione non può essere
            annullata.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Annulla</Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Elimina
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomerActions