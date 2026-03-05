import { ElectronAPI } from '@electron-toolkit/preload'
import { IDatabaseAPI, IWindowAPI, IPrintAPI, IUpdaterAPI } from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      database: IDatabaseAPI
      window: IWindowAPI
      print: IPrintAPI
      updater: IUpdaterAPI
    }
  }
}
