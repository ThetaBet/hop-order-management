export enum EColors {
  reset = '\x1b[0m',
  bright = '\x1b[1m',
  dim = '\x1b[2m',
  red = '\x1b[31m',
  green = '\x1b[32m',
  yellow = '\x1b[33m',
  blue = '\x1b[34m',
  magenta = '\x1b[35m',
  cyan = '\x1b[36m',
  white = '\x1b[37m',
  bgRed = '\x1b[41m',
  bgGreen = '\x1b[42m',
  bgYellow = '\x1b[43m',
  bgBlue = '\x1b[44m'
}

export enum ETypeSymbol {
  'info' = 'ℹ️',
  'warn' = '⚠️',
  'error' = '❌',
  'success' = '✅',
  'debug' = '🐛',
  'database' = '💾',
  'network' = '🌐',
  'system' = '⚙️'
}

export enum ELogType {
  info = 'INFO',
  warn = 'WARN',
  error = 'ERROR',
  success = 'SUCCESS',
  debug = 'DEBUG',
  database = 'DATABASE',
  network = 'NETWORK',
  system = 'SYSTEM',
  none = ''
}

export interface ILogConfig {
  color: string
  bgColor?: string
  symbol: ETypeSymbol
}

export const logConfigs: Record<string, ILogConfig> = {
  info: { color: EColors.blue, symbol: ETypeSymbol.info },
  warn: { color: EColors.yellow, symbol: ETypeSymbol.warn },
  error: { color: EColors.red, symbol: ETypeSymbol.error },
  success: { color: EColors.green, symbol: ETypeSymbol.success },
  debug: { color: EColors.magenta, symbol: ETypeSymbol.debug },
  database: { color: EColors.cyan, symbol: ETypeSymbol.database },
  network: { color: EColors.white, symbol: ETypeSymbol.network },
  system: { color: EColors.yellow, bgColor: EColors.bgBlue, symbol: ETypeSymbol.system }
}

export interface ILogFileOptions {
  enabled: boolean
  filePath: string
  fileName: string
  maxSizeMB: number
  maxFiles: number
  compress: boolean
}
