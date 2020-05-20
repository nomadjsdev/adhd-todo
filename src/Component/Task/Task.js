import React from 'react'

import {
	SaveButton,
	CancelButton,
	EditButton,
	DeleteButton,
} from 'Styles/Components'
import {
	TaskContainer,
	TitleContainer,
	Complete,
	Duplicate,
	Title,
	EditTitle,
	ControlContainer,
} from './Task.styles'

const Task = ({ data, functions, editing }) => {
	const { id, title, frame, complete } = data
	const {
		handleAddTask,
		setEditingTaskId,
		handleEditTask,
		handleDeleteTask,
	} = functions
	const { editingTask, editingFrames } = editing

	const [value, setValue] = React.useState(title)

	const inputRef = React.useRef()
	React.useEffect(() => {
		if (editingTask) {
			inputRef.current.focus()
		}
	}, [editingTask])

	return (
		<TaskContainer>
			<TitleContainer>
				{!editingTask && (
					<React.Fragment>
						<Complete
							complete={complete}
							onClick={() => {
								handleEditTask({ id, complete: !complete })
							}}
						/>
						<Title
							complete={complete}
							onClick={() => {
								handleEditTask({ id, complete: !complete })
							}}
						>
							{title}
						</Title>
					</React.Fragment>
				)}
				{editingTask && (
					<React.Fragment>
						<Duplicate
							onClick={() => {
								handleAddTask({ title, frame, complete })
							}}
						/>
						<EditTitle
							ref={inputRef}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</React.Fragment>
				)}
			</TitleContainer>
			{!editingFrames && (
				<ControlContainer>
					{!editingTask && (
						<React.Fragment>
							<EditButton
								onClick={() => {
									setEditingTaskId(id)
								}}
								disabled={complete}
							/>
							<DeleteButton
								onClick={() => {
									handleDeleteTask({ id })
								}}
							/>
						</React.Fragment>
					)}
					{editingTask && (
						<React.Fragment>
							<SaveButton
								onClick={() => {
									handleEditTask({ id, title: value })
								}}
							/>
							<CancelButton
								onClick={() => {
									setValue(title)
									setEditingTaskId(null)
								}}
							/>
						</React.Fragment>
					)}
				</ControlContainer>
			)}
		</TaskContainer>
	)
}

export default Task
