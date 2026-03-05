import { IElectronAPI } from './electron'

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
