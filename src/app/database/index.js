import Dexie from 'dexie'
import { Config } from 'helpers'
export class Database extends Dexie {
  constructor () {
    super(Config('database.name'))
    this.version(1).stores(Config('database.entities'))
  }
}
export const DB = new Database()

DB.users.hook('updating', function (modifications, primKey, obj, transaction) {})

DB.users.hook('creating', function (primKey, obj, transaction) {})
