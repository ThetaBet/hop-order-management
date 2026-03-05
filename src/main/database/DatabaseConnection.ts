import { app } from 'electron'
import * as path from 'path'
import Database from 'better-sqlite3'
import { initQuery } from './initQuery'
import log from '../logger'

export class DatabaseConnection {
  private static instance: DatabaseConnection
  private db: Database.Database
  private dbPath: string = path.join(app.getPath('userData'), 'hopom.db')

  private constructor() {
    this.db = new Database(this.dbPath)
    this.initialize()
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  private initialize() {
    this.db.exec(initQuery)
    log.database(`Database initialized at ${this.dbPath}`)
  }

  public getDatabase(): Database.Database {
    return this.db
  }

  public quit() {
    this.db.close()
    log.database('Database connection closed')
  }

  public transaction<T>(fn: () => T): T {
    const transaction = this.db.transaction(fn)
    return transaction()
  }
}
