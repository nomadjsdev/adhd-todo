import React from 'react'

import db from 'Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

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

const App = () => {
	const [useDefault, setUseDefault] = React.useState(false)

	const [frames, setFrames] = React.useState([])
	React.useEffect(() => {
		db.table('frames')
			.toArray()
			.then((frames) => {
				if (frames.length === 0) {
					setUseDefault(true)
					// If there are no frames in the DB, use default data
					db.table('frames')
						.bulkAdd(defaultFrames)
						.then(() => {
							setFrames(defaultFrames)
						})
				} else {
					setFrames(frames)
				}
			})
	}, [])

	const [tasks, setTasks] = React.useState([])
	React.useEffect(() => {
		if (frames.length > 0) {
			db.table('tasks')
				.toArray()
				.then((tasks) => {
					if (tasks.length === 0 && useDefault) {
						// If there are no tasks in the DB and Frames were populated from defaults, use default data for tasks
						db.table('tasks')
							.bulkAdd(defaultTasks)
							.then(() => {
								setTasks(defaultTasks)
							})
					} else {
						setTasks(tasks)
					}
				})
		}
	}, [frames, useDefault])

	const [editingId, setEditingId] = React.useState(null)

	const handleAddTask = async ({ frame }) => {
		const task = { title: 'New task...', frame, complete: false }

		db.table('tasks')
			.put(task)
			.then(() => {
				setTasks((prevTasks) => [...prevTasks, task])
				setEditingId(task.id)
			})
	}

	const handleMarkComplete = async ({ id, complete }) => {
		db.table('tasks')
			.update(id, { complete })
			.then(() => {
				const newList = tasks.map((task) => {
					if (task.id === id) {
						task.complete = complete
					}
					return task
				})
				setTasks(newList)
			})
	}

	const handleEditTask = async ({ id, title }) => {
		const taskToEdit = tasks.find((task) => task.id === id)

		if (taskToEdit.title !== title) {
			db.table('tasks')
				.update(id, { title })
				.then(() => {
					const newList = tasks.map((task) => {
						if (task.id === id) {
							task.title = title
						}
						return task
					})
					setTasks(newList)
					setEditingId(null)
				})
		}
	}

	const handleDelete = async ({ id }) => {
		db.table('tasks')
			.delete(id)
			.then(() => {
				const newList = tasks.filter((task) => task.id !== id)
				setTasks(newList)
			})
	}

	return (
		<React.Fragment>
			{frames &&
				frames.map((frame, index) => (
					<Frame
						key={`frame-${index}`}
						data={frame}
						functions={{ handleAddTask }}
					>
						{tasks
							.filter((task) => task.frame === frame.id)
							.map((task, index) => (
								<Task
									key={`task-${index}`}
									data={task}
									functions={{
										setEditingId,
										handleMarkComplete,
										handleEditTask,
										handleDelete,
									}}
									editing={editingId === task.id}
								/>
							))}
					</Frame>
				))}
		</React.Fragment>
	)
}

export default App
