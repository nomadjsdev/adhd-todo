import React from 'react'

import {
	TaskContainer,
	TitleContainer,
	Complete,
	Title,
	EditTitle,
	ControlContainer,
	EditButton,
	SaveButton,
	CancelButton,
	DeleteButton,
} from './Task.styles'

const Task = ({ data, functions, editing }) => {
	const { id, title, complete } = data
	const {
		setEditingId,
		handleMarkComplete,
		handleEditTask,
		handleDelete,
	} = functions

	const [value, setValue] = React.useState(title)

	const inputRef = React.useRef()
	React.useEffect(() => {
		if (editing) {
			inputRef.current.focus()
		}
	}, [editing])

	return (
		<TaskContainer>
			<TitleContainer>
				<Complete
					complete={complete}
					onClick={() => {
						handleMarkComplete({ id, complete: !complete })
					}}
				/>
				{!editing && (
					<Title
						complete={complete}
						onClick={() => {
							handleMarkComplete({ id, complete: !complete })
						}}
					>
						{title}
					</Title>
				)}
				{editing && (
					<EditTitle
						ref={inputRef}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				)}
			</TitleContainer>
			<ControlContainer>
				{!editing && (
					<React.Fragment>
						<EditButton
							onClick={() => {
								setEditingId(id)
							}}
							disabled={complete}
						/>
						<DeleteButton
							onClick={() => {
								handleDelete({ id })
							}}
						/>
					</React.Fragment>
				)}
				{editing && (
					<React.Fragment>
						<SaveButton
							onClick={() => {
								handleEditTask({ id, title: value })
							}}
						/>
						<CancelButton
							onClick={() => {
								setValue(title)
								setEditingId(null)
							}}
						/>
					</React.Fragment>
				)}
			</ControlContainer>
		</TaskContainer>
	)
}

export default Task
