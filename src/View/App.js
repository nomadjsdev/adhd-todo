import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import db from 'Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

import { AddButton } from 'Styles/Components'
import { Header, EditFramesButton } from './App.styles'

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
	const [frames, setFrames] = React.useState([])
	React.useEffect(() => {
		db.table('frames')
			.orderBy('position')
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

	const [taskOrder, setTaskOrder] = React.useState([])
	React.useEffect(() => {
		db.table('taskOrder')
			.orderBy('frame')
			.toArray()
			.then((taskOrder) => {
				setTaskOrder(taskOrder)
			})
	}, [])

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
		const frame = {
			title: 'New frame...',
			timeEnd: null,
			timeStart: null,
			position,
		}

		db.table('frames')
			.put(frame)
			.then(() => {
				setFrames((prevFrames) => [...prevFrames, frame])

				db.table('taskOrder')
					.add({ frame: frame.id, order: [] })
					.then((id) => {
						const newTaskOrder = Array.from(taskOrder)
						newTaskOrder.push({ id, frame: frame.id, order: [] })
						setTaskOrder(newTaskOrder)
					})
			})
	}

	const handleEditFrame = ({ id, title, timeStart, timeEnd }) => {
		const frameToEdit = frames.find((frame) => frame.id === id)

		if (
			frameToEdit.title === title &&
			frameToEdit.timeStart === timeStart &&
			frameToEdit.timeEnd === timeEnd
		) {
			setEditingFrameId(null)
			return
		}

		if (!title) {
			title = frameToEdit.title
		}

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
				db.table('taskOrder')
					.where('frame')
					.equals(id)
					.delete()
					.then(() => {
						const newTaskOrder = taskOrder.filter((entry) => entry.frame !== id)
						setTaskOrder(newTaskOrder)
					})
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
				const newTaskOrder = Array.from(taskOrder)
				for (const entry of newTaskOrder) {
					if (entry.frame === frame) {
						entry.order.push(task.id)
					}
				}
				db.table('taskOrder')
					.bulkPut(newTaskOrder)
					.then(() => {
						setTaskOrder(newTaskOrder)
					})
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
				const newTaskOrder = Array.from(taskOrder)
				for (const entry of newTaskOrder) {
					const taskIndex = entry.order.findIndex((taskId) => taskId === id)
					if (taskIndex !== -1) {
						entry.order.splice(taskIndex, 1)
					}
				}
				db.table('taskOrder')
					.bulkPut(newTaskOrder)
					.then(() => {
						setTaskOrder(newTaskOrder)
					})
				const newList = tasks.filter((task) => task.id !== id)
				setTasks(newList)
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
			db.table('frames')
				.bulkPut(updatedPositions)
				.catch((error) => {
					setFrames(oldFrameOrder)
					console.log(error)
				})
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
			db.table('taskOrder')
				.bulkPut(newOrderArray)
				.then(() => {
					db.table('tasks').update(id, { frame: destinationFrame })
				})
				.catch((error) => {
					setTaskOrder(oldOrderArray)
					console.log(error)
				})
		}
	}

	return (
		<React.Fragment>
			<Header>
				<EditFramesButton
					onClick={() => {
						setEditingFrames(!editingFrames)
					}}
				>
					{editingFrames ? 'Stop editing' : 'Edit frames'}
				</EditFramesButton>
				{editingFrames && (
					<AddButton
						onClick={() => {
							handleAddFrame()
						}}
					/>
				)}
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
															let returnArray = []
															for (const [
																index,
																taskId,
															] of item.order.entries()) {
																const task = tasks.find(
																	(task) => task.id === taskId,
																)
																returnArray.push(
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
															return returnArray
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
