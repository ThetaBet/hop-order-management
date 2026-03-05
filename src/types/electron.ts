import type { BrowserWindowConstructorOptions } from 'electron'
import { IDatabaseAPI } from './database'

export interface IElectronAPI {
  database: IDatabaseAPI
  minimizeWindow: () => Promise<void>
  maximizeWindow: () => Promise<void>
  closeWindow: () => Promise<void>
  isWindowMaximized: () => Promise<boolean>
  openModal: (
    htmlFile: string,
    options?: Partial<BrowserWindowConstructorOptions>
  ) => Promise<{ success: boolean; windowId: number }>
  closeModal: (windowId?: number) => Promise<{ success: boolean }>
}
