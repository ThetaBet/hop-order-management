import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron'
import path from 'path'

let newCustomerWindow: BrowserWindow | null = null
let customerDetailWindow: BrowserWindow | null = null

export const openNewCustomerWindow = (mainWindowRef: BrowserWindow | null) => {
  if (newCustomerWindow) {
    (newCustomerWindow as BrowserWindow).focus()
    return
  }

  newCustomerWindow = new BrowserWindow({
    width: 600,
    height: 650,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Nuovo cliente',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newCustomerWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/customers/new`)
  } else {
    newCustomerWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: '/customers/new'
    })
  }
  newCustomerWindow.on('ready-to-show', () => {
    newCustomerWindow?.show()
    newCustomerWindow?.focus()
  })

  const preventMainFocus = () => {
    if (newCustomerWindow && !newCustomerWindow.isDestroyed()) {
      newCustomerWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  newCustomerWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    newCustomerWindow = null
  })
}

export const openCustomerDetailWindow = (mainWindowRef: BrowserWindow | null, customerId: number) => {
  if (customerDetailWindow) {
    (customerDetailWindow as BrowserWindow).focus()
    return
  }

  customerDetailWindow = new BrowserWindow({
    width: 800,
    height: 700,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    titleBarStyle: 'default',
    frame: false,
    title: 'Dettagli cliente',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    customerDetailWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/customers/${customerId}/edit`)
  } else {
    customerDetailWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: `/customers/${customerId}/edit`
    })
  }
  customerDetailWindow.on('ready-to-show', () => {
    customerDetailWindow?.show()
    customerDetailWindow?.focus()
  })

  const preventMainFocus = () => {
    if (customerDetailWindow && !customerDetailWindow.isDestroyed()) {
      customerDetailWindow.focus()
    }
  }

  if (mainWindowRef) {
    mainWindowRef.on('focus', preventMainFocus)
    mainWindowRef.on('show', preventMainFocus)
  }

  customerDetailWindow.on('closed', () => {
    if (mainWindowRef) {
      mainWindowRef.removeListener('focus', preventMainFocus)
      mainWindowRef.removeListener('show', preventMainFocus)
      mainWindowRef.focus()
    }
    customerDetailWindow = null
  })
}

export const closeNewCustomerWindow = () => {
  if (newCustomerWindow && !newCustomerWindow.isDestroyed()) {
    newCustomerWindow.close()
    newCustomerWindow = null
  }
}

export const closeCustomerDetailWindow = () => {
  if (customerDetailWindow && !customerDetailWindow.isDestroyed()) {
    customerDetailWindow.close()
    customerDetailWindow = null
  }
}