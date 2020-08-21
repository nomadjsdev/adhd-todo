import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { fetchAll, putInDb, updateDb, deleteFromDb, reinitDb } from 'Action/Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

import { defaultNewFrame, defaultNewTask, actions } from 'Constants'

import { AddButton } from 'Styles/Components'
import { Header, EditFramesButton, Title } from './App.styles'

const replaceInArrayByIndex = (array, index, data) => [
	...array.slice(0, index),
	data,
	...array.slice(index + 1),
]

const reorderArrayByIndex = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const App = () => {
	const [loading, setLoading] = React.useState(actions.db.LOADING)
	const [frames, setFrames] = React.useState([])
	const [tasks, setTasks] = React.useState([])
	const [taskOrder, setTaskOrder] = React.useState([])

	React.useEffect(() => {
		if (loading === actions.db.LOADING || loading === actions.db.RELOAD) {
			fetchAll([
				{ name: 'frames', order: 'position' },
				{ name: 'tasks' },
				{ name: 'taskOrder', order: '' },
			])
				.then((response) => {
					setFrames(response.frames)
					setTasks(response.tasks)
					setTaskOrder(response.taskOrder)
					setLoading(actions.db.LOADED)
				})
				.catch((error) => {
					console.log(error)
					setLoading(actions.db.ERROR)
				})
		}
	}, [loading])

	const [editingFrames, setEditingFrames] = React.useState(false)
	const [editingFrameId, setEditingFrameId] = React.useState(null)
	const [editingTaskId, setEditingTaskId] = React.useState(null)

	React.useEffect(() => {
		if (!editingFrames) {
			setEditingFrameId(null)
		}
	}, [editingFrames])

	const handleAddFrame = () => {
		const position = frames.length + 1
		const frame = { ...defaultNewFrame, position }

		putInDb({ table: 'frames', data: frame })
			.then(() => {
				setFrames((prevFrames) => [...prevFrames, frame])
				putInDb({
					table: 'taskOrder',
					data: { frame: frame.id, order: [] },
				})
					.then((id) => {
						const newTaskOrder = Array.from(taskOrder)
						newTaskOrder.push({ id, frame: frame.id, order: [] })
						setTaskOrder(newTaskOrder)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleEditFrame = ({ id, title, timeStart }) => {
		const frameToEdit = frames.find((frame) => frame.id === id)

		if (frameToEdit.title === title && frameToEdit.timeStart === timeStart) {
			setEditingFrameId(null)
			return
		}

		if (!title) {
			title = frameToEdit.title
		}

		updateDb({ table: 'frames', id, data: { title, timeStart } })
			.then(() => {
				const index = frames.findIndex((frame) => frame.id === id)
				const newList = replaceInArrayByIndex(frames, index, {
					id,
					title,
					timeStart,
				})
				setFrames(newList)
				setEditingFrameId(null)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleDeleteFrame = ({ id }) => {
		deleteFromDb({ table: 'frames', id })
			.then(() => {
				const newList = frames.filter((frame) => frame.id !== id)
				setFrames(newList)
			})
			.then(() => {
				deleteFromDb({ table: 'taskOrder', id, filter: 'frame' })
					.then(() => {
						const newTaskOrder = taskOrder.filter((entry) => entry.frame !== id)
						setTaskOrder(newTaskOrder)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.then(() => {
				deleteFromDb({ table: 'tasks', id, filter: 'frame' })
					.then(() => {
						const newList = tasks.filter((task) => task.frame !== id)
						setTasks(newList)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleAddTask = ({
		title = defaultNewTask.title,
		frame,
		complete = defaultNewTask.complete,
	}) => {
		const task = { title, frame, complete }

		putInDb({ table: 'tasks', data: task })
			.then((id) => {
				setTasks((prevTasks) => [...prevTasks, task])
				setEditingTaskId(id)
				const newTaskOrder = Array.from(taskOrder)
				const taskOrderIndexToUpdate = newTaskOrder.findIndex(
					(entry) => entry.frame === frame,
				)

				newTaskOrder[taskOrderIndexToUpdate].order.push(id)

				putInDb({ table: 'taskOrder', data: newTaskOrder, isBulk: true })
					.then(() => {
						setTaskOrder(newTaskOrder)
					})
					.catch((error) => {
						console.log(error)
					})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleEditTask = ({ id, title, frame, complete }) => {
		const taskToEdit = tasks.find((task) => task.id === id)

		if (
			taskToEdit.title === title &&
			taskToEdit.frame === frame &&
			taskToEdit.complete === complete
		) {
			setEditingTaskId(null)
			return
		}

		if (!title) {
			title = taskToEdit.title
		}

		if (!frame) {
			frame = taskToEdit.frame
		}

		updateDb({ table: 'tasks', id, data: { title, frame, complete } })
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
			.catch((error) => {
				console.log(error)
			})
	}

	const handleDeleteTask = ({ id, frame }) => {
		deleteFromDb({ table: 'tasks', id })
			.then(() => {
				const newTaskOrder = Array.from(taskOrder)
				const taskOrderIndexToUpdate = newTaskOrder.findIndex(
					(entry) => entry.frame === frame,
				)
				const taskIndexToDelete = newTaskOrder[
					taskOrderIndexToUpdate
				].order.findIndex((taskId) => taskId === id)

				newTaskOrder[taskOrderIndexToUpdate].order.splice(taskIndexToDelete, 1)

				putInDb({ table: 'taskOrder', data: newTaskOrder, isBulk: true })
					.then(() => {
						setTaskOrder(newTaskOrder)
					})
					.catch((error) => {
						console.log(error)
					})
				const newList = tasks.filter((task) => task.id !== id)
				setTasks(newList)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleDragEvent = (event) => {
		if (!event.destination) {
			return
		}

		if (
			event.destination.index === event.source.index &&
			event.destination.droppableId === event.source.droppableId
		) {
			return
		}

		if (event.type === 'FRAME') {
			const oldFrameOrder = Array.from(frames)
			const newFrameOrder = reorderArrayByIndex(
				frames,
				event.source.index,
				event.destination.index,
			)

			const updatedPositions = newFrameOrder.map((frame, index) => {
				frame.position = index + 1
				return frame
			})

			// Update state
			setFrames(updatedPositions)

			// Update database
			putInDb({ table: 'frames', data: updatedPositions, isBulk: true }).catch(
				(error) => {
					setFrames(oldFrameOrder)
					console.log(error)
				},
			)
		}

		if (event.type === 'TASK') {
			const id = parseInt(event.draggableId.split('-')[1])
			const sourceFrame = parseInt(event.source.droppableId.split('-')[1])
			const destinationFrame = parseInt(
				event.destination.droppableId.split('-')[1],
			)
			const sourceTaskOrder = taskOrder.find(
				(entry) => entry.frame === sourceFrame,
			)['order']
			const destinationTaskOrder = taskOrder.find(
				(entry) => entry.frame === destinationFrame,
			)['order']

			const oldOrderArray = Array.from(taskOrder)
			let newOrderArray
			if (sourceFrame === destinationFrame) {
				const newTaskOrder = reorderArrayByIndex(
					sourceTaskOrder,
					event.source.index,
					event.destination.index,
				)

				newOrderArray = taskOrder.map((entry) => {
					if (entry.frame === sourceFrame) {
						const newEntry = { ...entry, order: newTaskOrder }
						return newEntry
					}
					return entry
				})
			}

			if (sourceFrame !== destinationFrame) {
				const newDestinationTaskOrder = Array.from(destinationTaskOrder)
				newDestinationTaskOrder.splice(event.destination.index, 0, id)

				const newSourceTaskOrder = Array.from(sourceTaskOrder)
				newSourceTaskOrder.splice(event.source.index, 1)

				newOrderArray = taskOrder.map((entry) => {
					if (entry.frame === sourceFrame) {
						const newEntry = { ...entry, order: newSourceTaskOrder }
						return newEntry
					}
					if (entry.frame === destinationFrame) {
						const newEntry = { ...entry, order: newDestinationTaskOrder }
						return newEntry
					}
					return entry
				})
			}

			// Update state
			setTaskOrder(newOrderArray)

			// Update database
			putInDb({ table: 'taskOrder', data: newOrderArray, isBulk: true })
				.then(() => {
					updateDb({
						table: 'tasks',
						id,
						data: { frame: destinationFrame },
					}).catch((error) => {
						console.log(error)
					})
				})
				.catch((error) => {
					setTaskOrder(oldOrderArray)
					console.log(error)
				})
		}
	}

	const handleReinitDb = async () => {
		await reinitDb()
		setEditingFrames(false)
		setEditingFrameId(null)
		setEditingTaskId(null)
		setLoading(actions.db.RELOAD)
	}

	if (loading === actions.db.LOADING) {
		return (
			<React.Fragment>
				<Title>Loading</Title>
			</React.Fragment>
		)
	}

	if (loading === actions.db.ERROR) {
		return (
			<React.Fragment>
				<Title>There was an error loading the database</Title>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<Header>
				{frames.length === 0 && (
					<EditFramesButton
						onClick={() => {
							handleReinitDb()
						}}
					>
						Load defaults
					</EditFramesButton>
				)}
				{frames.length > 0 && (
					<EditFramesButton
						onClick={() => {
							setEditingFrames(!editingFrames)
						}}
					>
						{editingFrames ? 'Done' : 'Edit frames'}
					</EditFramesButton>
				)}
				<AddButton
					onClick={() => {
						handleAddFrame()
					}}
				/>
			</Header>
			<DragDropContext onDragEnd={handleDragEvent}>
				<Droppable droppableId='list' type='FRAME'>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{frames &&
								frames.map((frame, index) => (
									<Frame
										key={`frame-${frame.id}`}
										index={index}
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
										<Droppable droppableId={`f-${frame.id}`} type='TASK'>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													{taskOrder
														.filter((entry) => entry.frame === frame.id)
														.map((item) => {
															let taskList = []
															for (const [
																index,
																taskId,
															] of item.order.entries()) {
																const task = tasks.find(
																	(task) => task.id === taskId,
																)
																taskList.push(
																	<Task
																		key={`task-${task.id}`}
																		index={index}
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
																	/>,
																)
															}
															return taskList
														})}

													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</Frame>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</React.Fragment>
	)
}

export default App
