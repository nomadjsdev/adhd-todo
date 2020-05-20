import React from 'react'

import db from 'Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

import { EditFramesButton } from './App.styles'

const replaceInArrayByIndex = (array, index, data) => [
	...array.slice(0, index),
	data,
	...array.slice(index + 1),
]

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

	const [editingFrames, setEditingFrames] = React.useState(false)
	const [editingFrameId, setEditingFrameId] = React.useState(null)
	const [editingTaskId, setEditingTaskId] = React.useState(null)

	React.useEffect(() => {
		if (!editingFrames) setEditingFrameId(null)
	}, [editingFrames])

	const handleAddFrame = () => {
		const frame = { title: 'New frame...', timeEnd: null, timeStart: null }

		db.table('frames')
			.put(frame)
			.then(() => {
				setFrames((prevFrames) => [...prevFrames, frame])
			})
	}

	const handleEditFrame = (data) => {
		const frameToEdit = frames.find((frame) => frame.id === data.id)
		const {
			id,
			title = frameToEdit.title,
			timeStart = frameToEdit.timeStart,
			timeEnd = frameToEdit.timeEnd,
		} = data

		// TODO: if no changes, do not update database or state

		db.table('frames')
			.update(id, { title, timeStart, timeEnd })
			.then(() => {
				const index = frames.findIndex((frame) => frame.id === id)
				const newList = replaceInArrayByIndex(frames, index, {
					id,
					title,
					timeStart,
					timeEnd,
				})
				setFrames(newList)
				setEditingFrameId(null)
			})
	}

	const handleDeleteFrame = ({ id }) => {
		db.table('frames')
			.delete(id)
			.then(() => {
				const newList = frames.filter((frame) => frame.id !== id)
				setFrames(newList)
			})
			.then(() => {
				db.table('tasks')
					.where('frame')
					.equals(id)
					.delete()
					.then(() => {
						const newList = tasks.filter((task) => task.frame !== id)
						setTasks(newList)
					})
			})
	}

	const handleAddTask = (data) => {
		const { title = 'New task...', frame, complete = false } = data
		const task = { title, frame, complete }

		db.table('tasks')
			.add(task)
			.then(() => {
				setTasks((prevTasks) => [...prevTasks, task])
				setEditingTaskId(task.id)
			})
	}

	const handleEditTask = (data) => {
		const taskToEdit = tasks.find((task) => task.id === data.id)
		const {
			id,
			title = taskToEdit.title,
			frame = taskToEdit.frame,
			complete = taskToEdit.complete,
		} = data

		// TODO: if no changes, do not update database or state

		db.table('tasks')
			.update(id, { title, frame, complete })
			.then(() => {
				const index = tasks.findIndex((task) => task.id === id)
				const newList = replaceInArrayByIndex(tasks, index, {
					id,
					title,
					frame,
					complete,
				})
				setTasks(newList)
				setEditingTaskId(null)
			})
	}

	const handleDeleteTask = ({ id }) => {
		db.table('tasks')
			.delete(id)
			.then(() => {
				const newList = tasks.filter((task) => task.id !== id)
				setTasks(newList)
			})
	}

	return (
		<React.Fragment>
			<EditFramesButton
				onClick={() => {
					setEditingFrames(!editingFrames)
				}}
			>
				{editingFrames ? 'Stop editing' : 'Edit frames'}
			</EditFramesButton>
			{frames &&
				frames.map((frame, index) => (
					<Frame
						key={`frame-${index}`}
						data={frame}
						functions={{
							handleAddTask,
							setEditingFrameId,
							handleEditFrame,
							handleDeleteFrame,
						}}
						editing={{
							editingFrames,
							editingFrame: editingFrameId === frame.id,
						}}
					>
						{tasks
							.filter((task) => task.frame === frame.id)
							.map((task, index) => (
								<Task
									key={`task-${index}`}
									data={task}
									functions={{
										handleAddTask,
										setEditingTaskId,
										handleEditTask,
										handleDeleteTask,
									}}
									editing={{
										editingTask: editingTaskId === task.id,
										editingFrames,
									}}
								/>
							))}
					</Frame>
				))}
		</React.Fragment>
	)
}

export default App
