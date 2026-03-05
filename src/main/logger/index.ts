import FileLogger from './fileLogger'
import { EColors, ELogType, ILogFileOptions, logConfigs } from './types'

const defaultOptions: ILogFileOptions = {
  enabled: true,
  filePath: 'logs',
  fileName: 'hop_order_management_logs.txt',
  maxSizeMB: 5,
  maxFiles: 3,
  compress: true
}

class Logger {
  private fileLogger: FileLogger
  private consoleEnabled: boolean = true

  constructor(fileOptions: ILogFileOptions = defaultOptions) {
    this.fileLogger = new FileLogger(fileOptions)
  }

  public log(message: string, type: keyof typeof logConfigs = 'info'): void {
    const config = logConfigs[type]
    const timestamp = new Date().toISOString()
    if (this.consoleEnabled) {
      const coloredMessage = `${config.color}${config.bgColor ? config.bgColor : ''}${config.symbol} [${timestamp}] ${message}${EColors.reset}`
      console.log(coloredMessage)
    }
    this.fileLogger.writeToFile(message, type as keyof typeof ELogType)
  }

  public info(message: string) {
    this.log(message, 'info')
  }

  public warn(message: string) {
    this.log(message, 'warn')
  }

  public error(message: string) {
    this.log(message, 'error')
  }

  public success(message: string) {
    this.log(message, 'success')
  }

  public debug(message: string) {
    this.log(message, 'debug')
  }

  public database(message: string) {
    this.log(message, 'database')
  }

  public network(message: string) {
    this.log(message, 'network')
  }

  public system(message: string) {
    this.log(message, 'system')
  }

  public group(title: string, type: keyof typeof logConfigs = 'info') {
    console.group(title)
    this.log(`📁 ${title}`, type)
  }

  public groupEnd() {
    console.groupEnd()
  }

  public table(data: any) {
    this.log('📊 Data table:', 'info')
    console.table(data)
  }

  public separator() {
    console.log(`${EColors.dim}${'-'.repeat(50)}${EColors.reset}`)
  }

  public disableConsoleLogging() {
    this.consoleEnabled = false
  }

  public enableConsoleLogging() {
    this.consoleEnabled = true
  }

  public close() {
    this.fileLogger.close()
  }
}

export const logger = (message: string, type: keyof typeof logConfigs = 'info'): void => {
  loggerInstance.log(message, type)
}

const loggerInstance = new Logger()

const log = {
  info: (message: string) => loggerInstance.info(message),
  warn: (message: string) => loggerInstance.warn(message),
  error: (message: string) => loggerInstance.error(message),
  success: (message: string) => loggerInstance.success(message),
  debug: (message: string) => loggerInstance.debug(message),
  database: (message: string) => loggerInstance.database(message),
  network: (message: string) => loggerInstance.network(message),
  system: (message: string) => loggerInstance.system(message),
  group: (title: string, type: keyof typeof logConfigs = 'info') =>
    loggerInstance.group(title, type),
  groupEnd: () => loggerInstance.groupEnd(),
  table: (data: any) => loggerInstance.table(data),
  separator: () => loggerInstance.separator(),
  disableConsoleLogging: () => loggerInstance.disableConsoleLogging(),
  enableConsoleLogging: () => loggerInstance.enableConsoleLogging(),
  close: () => loggerInstance.close()
}

export default log
