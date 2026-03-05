import fs from 'fs'
import path from 'path'
import { app } from 'electron'
import zlib from 'zlib'
import { ELogType, ILogFileOptions } from './types'

export default class FileLogger {
  private options: ILogFileOptions
  private logDirectory: string
  private currentLogFile: string

  constructor(options: ILogFileOptions) {
    this.options = options
    this.logDirectory = path.join(app.getPath('userData'), this.options.filePath)
    this.currentLogFile = path.join(this.logDirectory, this.options.fileName)
    this.initializeLogFile()
  }

  private initializeLogFile() {
    const currentDate = new Date()
    if (!this.options.enabled) return

    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true })
    }
    this.checkAndRotateIfNeeded()
    this.writeToFile('='.repeat(50))
    this.writeToFile(`Log session started at ${currentDate.toLocaleString()}`, 'info')
    this.writeToFile(`Log directory: ${this.logDirectory}`, 'info')
  }

  private checkAndRotateIfNeeded() {
    if (!fs.existsSync(this.currentLogFile)) return
    const stats = fs.statSync(this.currentLogFile)
    const sizeInMB = stats.size / (1024 * 1024)
    if (sizeInMB >= this.options.maxSizeMB) this.rotateLogFiles()
  }

  private rotateLogFiles() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const baseName = path.basename(this.options.fileName, '.txt')
    const rotatedFileName = path.join(this.logDirectory, `${baseName}_${timestamp}.txt`)
    try {
      fs.renameSync(this.currentLogFile, rotatedFileName)
      if (this.options.compress) {
        this.compressFile(rotatedFileName)
      }
      this.cleanupOldLogs()
    } catch (error) {
      console.error('Error rotating log files:', error)
    }
  }

  private compressFile(filePath: string) {
    try {
      const gzip = zlib.createGzip()
      const source = fs.createReadStream(filePath)
      const destination = fs.createWriteStream(`${filePath}.gz`)
      source.pipe(gzip).pipe(destination)
      destination.on('close', () => fs.unlinkSync(filePath))
    } catch (error) {
      console.error('Error compressing file:', error)
    }
  }

  private cleanupOldLogs() {
    try {
      const files = fs
        .readdirSync(this.logDirectory)
        .filter((file) => file.startsWith(path.basename(this.options.fileName, '.txt')))
        .map((file) => ({
          name: file,
          path: path.join(this.logDirectory, file),
          birthTime: fs.statSync(path.join(this.logDirectory, file)).birthtime
        }))
        .sort((a, b) => b.birthTime.getTime() - a.birthTime.getTime())

      const filesToDelete = files.slice(this.options.maxFiles)
      filesToDelete.forEach((file) => {
        fs.unlinkSync(file.path)
        console.log(`Deleted old log file: ${file.name}`)
      })
    } catch (error) {
      console.error('Error cleaning up old logs:', error)
    }
  }

  public writeToFile(message: string, type: keyof typeof ELogType = 'none') {
    if (!this.options.enabled) return
    try {
      this.checkAndRotateIfNeeded()
      const timestamp = new Date().toISOString()
      const typeString = type === 'none' ? '' : `[${ELogType[type]}] `
      const logMessage = `[${timestamp}] ${typeString}${message}\n`
      fs.appendFileSync(this.currentLogFile, logMessage, 'utf8')
    } catch (error) {
      console.error('Error writing to log file:', error)
    }
  }

  public close() {
    console.log('Closing logger')
    if (!this.options.enabled) return
    this.writeToFile('Log session ended', 'info')
    this.writeToFile('='.repeat(50))
  }

  public getLogDirectory(): string {
    return this.logDirectory
  }

  public getLogFiles(): string[] {
    if (!fs.existsSync(this.logDirectory)) return []
    return fs
      .readdirSync(this.logDirectory)
      .filter((file) => file.startsWith(path.basename(this.options.fileName, '.txt')))
      .sort()
      .reverse()
  }

  public cleanOldLogs(daysToKeep: number = 30) {
    if (!fs.existsSync(this.logDirectory)) return
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)
    const files = fs.readdirSync(this.logDirectory)
    files.forEach((file) => {
      const filePath = path.join(this.logDirectory, file)
      const stats = fs.statSync(filePath)
      if (stats.birthtime < cutoffDate) {
        fs.unlinkSync(filePath)
        console.log(`Deleted log file older than ${daysToKeep} days: ${file}`)
      }
    })
  }
}
