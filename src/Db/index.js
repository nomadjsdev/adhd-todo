import Dexie from 'dexie'

const DATABASE_VERSION = 1

const defaultSchema = {
	config: '',
	frames: '++id',
	tasks: '++id',
}

const defaultFrames = [
	{ id: 1, title: 'First thing', timeStart: '0700', timeEnd: null },
	{ id: 2, title: 'Morning', timeStart: '0800', timeEnd: '1300' },
	{ id: 3, title: 'Afternoon', timeStart: '1300', timeEnd: '1800' },
	{ id: 4, title: 'Evening', timeStart: '1800', timeEnd: '2300' },
	{ id: 5, title: 'Last thing', timeStart: '2400', timeEnd: null },
]

const defaultTasks = [
	{ id: 1, title: 'Stretch', frame: 1, complete: false },
	{ id: 2, title: 'Shower', frame: 1, complete: false },
	{ id: 3, title: 'Breakfast', frame: 2, complete: false },
	{ id: 4, title: 'Take medication', frame: 2, complete: false },
]

const currentDate = new Date(Date.now()).getDate()
const defaultDateTime = { day: currentDate }

const db = new Dexie('ADHD-todo')

db.version(DATABASE_VERSION).stores(defaultSchema)

// If the database is being created, populate it with default data
db.on('populate', () => {
	db.table('config').add(defaultDateTime, 1)
	db.table('frames').bulkAdd(defaultFrames)
	db.table('tasks').bulkAdd(defaultTasks)
})

// When the database is open, check current date with stored date
// If they don't match (i.e. it's a new day) reset all tasks to incomplete
// And update the stored date
db.on('ready', async () => {
	await db
		.table('config')
		.toArray()
		.then(async (config) => {
			if (config[0].day !== currentDate) {
				const tasks = await db.table('tasks').toArray()

				const resetTasks = await tasks.map((task) => {
					task.complete = false
					return task
				})

				db.table('tasks').bulkPut(resetTasks)
				db.table('config').update(1, { day: currentDate })
			}
		})
})

export default db
