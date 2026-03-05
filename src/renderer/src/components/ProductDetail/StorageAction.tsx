import { Warehouse } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography, InputAdornment } from "@mui/material";
import { FC, useState } from "react";
import { useStorage } from "@renderer/providers/StorageProvider";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const StorageAction: FC<Props> = ({ isOpen, handleClose }) => {
  const { currentQuantity, save } = useStorage();
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) ) return
    setInput(e.target.value);
  };

  const parsed = input === '' ? NaN : Number(input);
  const diff = Number.isFinite(parsed) ? parsed - (currentQuantity ?? 0) : 0;
  const diffText = Number.isFinite(parsed) && diff !== 0 ? ` (${diff > 0 ? '+' : ''}${diff})` : '';

  const canSave = Number.isFinite(parsed) && parsed >= 0;

  const handleSave = async () => {
    if (!canSave) return;
    await save(parsed);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Gestione Magazzino</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          <Typography component="span">Disponibile: </Typography>
          <Typography component="span" fontWeight={700}>{currentQuantity}</Typography>
          {diffText && (
            <Typography component="span" color={diff > 0 ? "green" : "error"} sx={{ ml: 1 }}>
              {diffText}
            </Typography>
          )}
        </DialogContentText>

        <Grid container spacing={2} alignItems="center">
          <Grid>
            <TextField
              value={input}
              onChange={handleInputChange}
              slotProps={{ input: {startAdornment: <InputAdornment position="start"><Warehouse /></InputAdornment>} }}
              label="Nuova quantità"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Chiudi</Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={!canSave}>
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StorageAction;