import { useEffect, useState, type FC, type ReactElement } from 'react'
import {
  Alert,
  Button,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Stack,
  Typography
} from '@mui/material'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'

type UpdateStatus =
  | { type: 'checking' }
  | { type: 'available'; version: string; releaseNotes?: string }
  | { type: 'not-available' }
  | { type: 'downloading'; percent: number; transferred: number; total: number }
  | { type: 'downloaded'; version: string }
  | { type: 'error'; message: string }

const UpdateNotification: FC = () => {
  const [status, setStatus] = useState<UpdateStatus | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = window.api.updater.onStatusChange((s) => {
      setStatus(s)
      // Mostra la notifica solo per eventi rilevanti
      if (s.type !== 'not-available' && s.type !== 'checking') {
        setOpen(true)
      }
    })
    return unsubscribe
  }, [])

  const handleDownload = (): void => {
    window.api.updater.downloadUpdate()
  }

  const handleInstall = (): void => {
    window.api.updater.installUpdate()
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  if (!status) return null

  const renderContent = (): ReactElement | null => {
    switch (status.type) {
      case 'available':
        return (
          <Alert
            severity="info"
            icon={<SystemUpdateAltIcon />}
            action={
              <Stack direction="row" spacing={1} alignItems="center">
                <Button color="inherit" size="small" onClick={handleDownload}>
                  Scarica
                </Button>
                <Button color="inherit" size="small" onClick={handleClose}>
                  Dopo
                </Button>
              </Stack>
            }
          >
            <Typography variant="body2">
              Nuova versione disponibile: <strong>{status.version}</strong>
            </Typography>
          </Alert>
        )

      case 'downloading':
        return (
          <Alert severity="info" icon={<CircularProgress size={16} />}>
            <Typography variant="body2" gutterBottom>
              Download aggiornamento… {Math.round(status.percent)}%
            </Typography>
            <LinearProgress variant="determinate" value={status.percent} />
          </Alert>
        )

      case 'downloaded':
        return (
          <Alert
            severity="success"
            icon={<SystemUpdateAltIcon />}
            action={
              <Button color="inherit" size="small" onClick={handleInstall}>
                Installa e riavvia
              </Button>
            }
          >
            <Typography variant="body2">
              Versione <strong>{status.version}</strong> pronta. Installa per aggiornare.
            </Typography>
          </Alert>
        )

      case 'error':
        return (
          <Alert severity="warning" onClose={handleClose}>
            <Typography variant="body2">
              Impossibile verificare aggiornamenti: {status.message}
            </Typography>
          </Alert>
        )

      default:
        return null
    }
  }

  const content = renderContent()
  if (!content) return null

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{ maxWidth: 420 }}
    >
      {content}
    </Snackbar>
  )
}

export default UpdateNotification
