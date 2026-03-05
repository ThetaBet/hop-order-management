import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron'
import path from 'path'

let driverWindow: BrowserWindow | null = null

export const openNewDriverWindow = (mainWindowRef: BrowserWindow | null, driverCode: string) => {
  if (driverWindow) {
    ;(driverWindow as BrowserWindow).focus()
    return
  }

  driverWindow = new BrowserWindow({
    width: 600,
    height: 650,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Nuovo autista',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    driverWindow.loadURL(
      `${process.env['ELECTRON_RENDERER_URL']}#/drivers/${driverCode ? driverCode : 'new'}`
    )
  } else {
    driverWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: `/drivers/${driverCode ? driverCode : 'new'}`
    })
  }
  driverWindow.on('ready-to-show', () => {
    driverWindow?.show()
    driverWindow?.focus()
  })

  const preventMainFocus = () => {
    if (driverWindow && !driverWindow.isDestroyed()) {
      driverWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  driverWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    driverWindow = null
  })
}

export const closeNewDriverWindow = () => {
  if (driverWindow && !driverWindow.isDestroyed()) {
    driverWindow.close()
    driverWindow = null
  }
}