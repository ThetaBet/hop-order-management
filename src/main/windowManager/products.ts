import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron'
import path from 'path'

let editProductWindow: BrowserWindow | null = null
let newProductWindow: BrowserWindow | null = null

export const openEditProductWindow = (mainWindowRef: BrowserWindow | null, productCode: string) => {
  if (editProductWindow) {
    ;(editProductWindow as BrowserWindow).focus()
    return
  }

  editProductWindow = new BrowserWindow({
    width: 600,
    height: 650,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Modifica prodotto',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    editProductWindow.loadURL(
      `${process.env['ELECTRON_RENDERER_URL']}#/products/${productCode}/edit`
    )
  } else {
    editProductWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: `/products/${productCode}/edit`
    })
  }
  editProductWindow.on('ready-to-show', () => {
    editProductWindow?.show()
    editProductWindow?.focus()
  })

  const preventMainFocus = () => {
    if (editProductWindow && !editProductWindow.isDestroyed()) {
      editProductWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  editProductWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    editProductWindow = null
  })
}

export const openNewProductWindow = (mainWindowRef: BrowserWindow | null) => {
  if (newProductWindow) {
    (newProductWindow as BrowserWindow).focus()
    return
  }
  newProductWindow = new BrowserWindow({
    width: 600,
    height: 650,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Nuovo prodotto',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newProductWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/products/new`)
  } else {
    newProductWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: '/products/new'
    })
  }
  newProductWindow.on('ready-to-show', () => {
    newProductWindow?.show()
    newProductWindow?.focus()
  })

  const preventMainFocus = () => {
    if (newProductWindow && !newProductWindow.isDestroyed()) {
      newProductWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  newProductWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    newProductWindow = null
  })
}

export const closeEditProductWindow = () => {
  if (editProductWindow) {
    editProductWindow.close()
    editProductWindow = null
  }
}

export const closeNewProductWindow = () => {
  if (newProductWindow) {
    newProductWindow.close()
    newProductWindow = null
  }
}
