import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { database, printAPI, windowAPI, updaterAPI } from './api'

// Custom APIs for renderer
const api = {
  database: database,
  window: windowAPI,
  print: printAPI,
  updater: updaterAPI
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
