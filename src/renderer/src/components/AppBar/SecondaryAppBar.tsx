import type { FC } from 'react'
import { Close } from '@mui/icons-material'
import { Toolbar, AppBar as MuiAppBar, IconButton, Typography } from '@mui/material'
import { IAppBarProps } from './contract'

const SecondaryAppBar: FC<IAppBarProps> = ({ pageName, closeApi, isDoubleCheckClose, operations }) => {
  const handleClose = () => {
    if (!closeApi) return
    if (!isDoubleCheckClose) {
      return closeApi()
    }
    return window.confirm(
      'Sei sicuro di voler chiudere la finestra? Tutti i dati non salvati andranno persi.'
    )
      ? closeApi()
      : null
  }


  return (
    <MuiAppBar position="fixed" sx={{ appRegion: 'drag' }} color='transparent'>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
        {operations}
        {!operations && <IconButton
          sx={{ appRegion: 'no-drag' }}
          color="inherit"
          size="large"
          edge="end"
          onClick={handleClose}
        >
          <Close />
        </IconButton>}
      </Toolbar>
    </MuiAppBar>
  )
}

export default SecondaryAppBar
