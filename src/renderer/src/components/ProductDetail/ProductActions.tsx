import { Delete, Edit, Warehouse } from "@mui/icons-material";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useDeleteProduct } from "@renderer/hooks/useProductsQuery";
import { useProduct } from "@renderer/providers/ProductProvider";
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom";
import StorageAction from "./StorageAction";

const ProductActions: FC = () => {
  const [ open, setOpen ] = useState<boolean | 'delete' | 'storage'>(false);
  const navigate = useNavigate();
  const { product } = useProduct();
  const query = useDeleteProduct();

  const handleDelete = () => {
    query.mutate(product?.productCode!, {
      onSuccess: () => navigate(-1)
    })
  }

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen('storage')}>
                <ListItemIcon>
                  <Warehouse />
                </ListItemIcon>
                <ListItemText primary="Gestisci magazzino" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => window.api.window.openEditProductWindow(product?.productCode!)}>
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
              <ListItemButton onClick={() => setOpen('delete')}>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                <ListItemText
                  disableTypography={true}
                  primary={<Typography color="error">Elimina prodotto</Typography>}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Dialog open={open === 'delete'} onClose={() => setOpen(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare il prodotto {product?.productName}? Questa azione non può essere annullata.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Annulla</Button>
            <Button color="error" onClick={handleDelete}>Elimina</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <StorageAction isOpen={open === 'storage'} handleClose={() => setOpen(false)} />
    </>
  )

}

export default ProductActions;