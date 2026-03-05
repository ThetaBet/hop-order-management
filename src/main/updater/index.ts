import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'
import { is } from '@electron-toolkit/utils'
import log from '../logger'

export type UpdateStatus =
  | { type: 'checking' }
  | { type: 'available'; version: string; releaseNotes?: string }
  | { type: 'not-available' }
  | { type: 'downloading'; percent: number; transferred: number; total: number }
  | { type: 'downloaded'; version: string }
  | { type: 'error'; message: string }

function getMainWindow(): BrowserWindow | undefined {
  return BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())
}

function send(status: UpdateStatus): void {
  const win = getMainWindow()
  if (win) {
    win.webContents.send('updater:status', status)
  }
}

export function setupAutoUpdater(): void {
  // In sviluppo non controlliamo gli aggiornamenti reali
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.logger = log

  if (is.dev) {
    log.info('[Updater] Modalità sviluppo: aggiornamenti automatici disabilitati')
    return
  }

  autoUpdater.on('checking-for-update', () => {
    log.info('[Updater] Controllo aggiornamenti in corso...')
    send({ type: 'checking' })
  })

  autoUpdater.on('update-available', (info) => {
    log.info(`[Updater] Aggiornamento disponibile: ${info.version}`)
    const notes =
      typeof info.releaseNotes === 'string'
        ? info.releaseNotes
        : Array.isArray(info.releaseNotes)
          ? (info.releaseNotes as Array<{ note: string }>).map((n) => n.note).join('\n')
          : undefined
    send({ type: 'available', version: info.version, releaseNotes: notes })
  })

  autoUpdater.on('update-not-available', () => {
    log.info('[Updater] Nessun aggiornamento disponibile')
    send({ type: 'not-available' })
  })

  autoUpdater.on('download-progress', (progress) => {
    log.info(`[Updater] Download: ${Math.round(progress.percent)}%`)
    send({
      type: 'downloading',
      percent: progress.percent,
      transferred: progress.transferred,
      total: progress.total
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    log.info(`[Updater] Aggiornamento scaricato: ${info.version}`)
    send({ type: 'downloaded', version: info.version })
  })

  autoUpdater.on('error', (err) => {
    log.error(`[Updater] Errore: ${err.message}`)
    send({ type: 'error', message: err.message })
  })

  // IPC: controllo manuale aggiornamenti
  ipcMain.handle('updater:check', async () => {
    try {
      await autoUpdater.checkForUpdates()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      log.error(`[Updater] checkForUpdates fallito: ${msg}`)
      send({ type: 'error', message: msg })
    }
  })

  // IPC: avvia il download dell'aggiornamento disponibile
  ipcMain.handle('updater:download', async () => {
    try {
      await autoUpdater.downloadUpdate()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      log.error(`[Updater] downloadUpdate fallito: ${msg}`)
      send({ type: 'error', message: msg })
    }
  })

  // IPC: installa e riavvia
  ipcMain.handle('updater:install', () => {
    autoUpdater.quitAndInstall(false, true)
  })

  // Controlla automaticamente all'avvio (dopo 5 secondi per non rallentare il boot)
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch((err) => {
      log.error(`[Updater] Controllo iniziale fallito: ${err.message}`)
    })
  }, 5000)
}
