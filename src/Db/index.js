import Dexie from 'dexie'

const DATABASE_VERSION = 1

const defaultSchema = {
	frames: '++id',
	tasks: '++id',
}

const db = new Dexie('ADHD-todo')

db.version(DATABASE_VERSION).stores(defaultSchema)

export default db
