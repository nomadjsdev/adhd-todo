import React from 'react'

import db from 'Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

const App = () => {
	const [frames, setFrames] = React.useState([])
	React.useEffect(() => {
		db.table('frames')
			.toArray()
			.then((frames) => {
				setFrames(frames)
			})
	}, [])

	const [tasks, setTasks] = React.useState([])
	React.useEffect(() => {
		db.table('tasks')
			.toArray()
			.then((tasks) => {
				setTasks(tasks)
			})
	}, [])

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
