import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'
import { ArrowBack, Close, CropSquare, Remove } from "@mui/icons-material";
import icon from '../../../../../resources/logotype_matte.png'


const SubRouteAppBar: FC = () => {
  const navigate = useNavigate();
    const handleClose = () => {
      window.confirm(
        "Sei sicuro di voler chiudere l'applicazione? Tutte le finestre aperte verranno chiuse."
      )
        ? window.api.window.closeMainWindow()
        : null
    }

    const handleMinimize = () => {
      window.api.window.minimizeMainWindow()
    }

    const handleMaximize = () => {
      window.api.window.maximizeMainWindow()
    }
  return (
    <MuiAppBar position="fixed" sx={{ appRegion: 'drag' }}>
      <Toolbar>
        <IconButton
          sx={{ appRegion: 'no-drag' }}
          color="inherit"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBack />
        </IconButton>
        <Box flexGrow={1}>
          <img src={icon} alt="App Icon" style={{ width: 'auto', height: 36, marginRight: 8 }} />
        </Box>
        <Box sx={{ appRegion: 'no-drag' }}>
          <IconButton color="inherit" size="small" onClick={handleMinimize} title="Riduci a icona">
            <Remove />
          </IconButton>
          <IconButton color="inherit" size="small" onClick={handleMaximize} title="Massimizza">
            <CropSquare fontSize="small" />
          </IconButton>
          <IconButton color="inherit" size="small" edge="end" onClick={handleClose} title="Chiudi">
            <Close />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}

export default SubRouteAppBar;