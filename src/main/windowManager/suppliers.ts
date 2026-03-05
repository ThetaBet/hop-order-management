import { is } from "@electron-toolkit/utils";
import { BrowserWindow } from "electron";
import path from "path";

let newSupplierWindow: BrowserWindow | null = null

export const openNewSupplierWindow = (mainWindowRef: BrowserWindow | null, supplierId: string) => {
  if (newSupplierWindow) {
    ;(newSupplierWindow as BrowserWindow).focus()
    return
  }

  newSupplierWindow = new BrowserWindow({
    width: 600,
    height: 650,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Nuovo fornitore',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newSupplierWindow.loadURL(
      `${process.env['ELECTRON_RENDERER_URL']}#/suppliers/${supplierId ? supplierId : 'new'}`
    )
  } else {
    newSupplierWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: `/suppliers/${supplierId ? supplierId : 'new'}`
    })
  }
  newSupplierWindow.on('ready-to-show', () => {
    newSupplierWindow?.show()
    newSupplierWindow?.focus()
  })

  const preventMainFocus = () => {
    if (newSupplierWindow && !newSupplierWindow.isDestroyed()) {
      newSupplierWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  newSupplierWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    newSupplierWindow = null
  })
}

export const closeNewSupplierWindow = () => {
  if (newSupplierWindow && !newSupplierWindow.isDestroyed()) {
    newSupplierWindow.close()
  }
}